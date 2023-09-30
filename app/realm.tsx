import Realm, { BSON } from 'realm';
import { createRealmContext } from '@realm/react';
import { ObjectId } from 'bson';
Realm.flags.THROW_ON_GLOBAL_REALM = false;
export enum Schemas {
    User = 'usersSchema1.1.1.4',
    Wallet = 'walletsSchema1.1.1.4',
    Account = 'accountsSchema1.1.1.4',
    Address = 'addressesSchema1.1.1.4',
}
// Define TypeScript interfaces for schema objects
export type networkNameTypes = "mainnet" | "testnet";
export interface IAccountSchema {
    _id: BSON.ObjectId;
    name: string;
    privateKey: string;
    addresses: string[];
    activeAddressId?: ObjectId;
    createdAt: Date;
    updatedAt?: Date;
    parentWalletId: ObjectId;
    networkName: networkNameTypes;
}
export interface IWalletSchema {
    _id: BSON.ObjectId;
    name: string;
    passphrase: string;
    accounts: string[];
    activeAccountId?: ObjectId; // account id
    activeNetworkName: networkNameTypes;
    createdAt: Date;
    updatedAt?: Date;
}

export interface IUserSchema {
    _id: BSON.ObjectId;
    password: string;
    wallets: string[];
    activeWalletId?: ObjectId; // wallet id
    createdAt: Date;
    updatedAt?: Date;
    step?: number;
}
export interface IAddressSchema {
    _id: BSON.ObjectId;
    address: string;
    type: string;
    customHdPath?: string;
    parentAccountId: ObjectId;
}
class AddressSchema extends Realm.Object<IAddressSchema> {
    address: string = "";
    type: string = "";
    customHdPath?: string | undefined;
    parentAccountId!: ObjectId;
    static schema = {
        name: Schemas.Address,
        // embedded: true, // default: false
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            address: "string?",
            type: "string?",
            customHdPath: "string?",
            parentAccountId: 'objectId',
        },
    };
}

export class AccountSchema extends Realm.Object implements IAccountSchema {
    _id: ObjectId = new ObjectId;
    name!: string;
    privateKey!: string;
    createdAt: Date = new Date();
    updatedAt?: Date | undefined;
    addresses!: string[]; // Change the type to IAddressSchema
    parentWalletId!: ObjectId;
    networkName!: networkNameTypes;
    activeAddressId?: ObjectId;
    static schema: Realm.ObjectSchema = {
        name: Schemas.Account,
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            name: { type: 'string', default: '' },
            privateKey: 'string',
            addresses: 'string[]',
            createdAt: "date",
            updatedAt: 'date?',
            parentWalletId: 'objectId',
            networkName: "string",
            activeAddressId: 'objectId?',
        },
    };
}


export class WalletSchema extends Realm.Object implements IWalletSchema {
    _id: ObjectId = new ObjectId;
    name!: string;
    passphrase!: string;
    accounts: string[] = [];
    createdAt: Date = new Date();
    updatedAt?: Date | undefined;
    activeAccountId?: ObjectId;
    activeNetworkName!: networkNameTypes;
    static schema: Realm.ObjectSchema = {
        name: Schemas.Wallet,
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            name: { type: 'string', default: '' },
            passphrase: 'string',
            accounts: 'string[]',
            createdAt: { type: 'date', default: new Date() },
            updatedAt: 'date?',
            activeAccountId: 'objectId?',
            activeNetworkName: "string"
        },
    };
}

export class UserSchema extends Realm.Object implements IUserSchema {
    _id: ObjectId = new ObjectId;
    password!: string;
    wallets: string[] = [];
    createdAt!: Date;
    updatedAt?: Date | undefined;
    step?: number | undefined;
    activeWalletId?: ObjectId;
    static schema: Realm.ObjectSchema = {
        name: Schemas.User,
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            password: { type: 'string', default: '' },
            wallets: 'string[]',
            createdAt: { type: 'date', default: new Date() },
            updatedAt: 'date?',
            step: 'int?',
            activeWalletId: 'objectId?',
        },
    };
}
// Define the Realm schema array
const realmConfig: Realm.Configuration = {
    schema: [UserSchema, AccountSchema, WalletSchema, AddressSchema],
    schemaVersion: 29, // Update the schema version
};
export const { RealmProvider, useRealm, useObject, useQuery } = createRealmContext(
    realmConfig
);
export const masterUserQuery = async (): Promise<IUserSchema | undefined> => {
    try {
        const realm = await Realm.open(realmConfig);
        const user = realm.objects<IUserSchema>(Schemas.User)[0];
        return user;
    } catch (error) {
        console.error("Error in masterUserQuery:", error);
        throw error;
    }
}

export const getActiveWallet = async (): Promise<IWalletSchema | null> => {
    try {
        const realm = await Realm.open(realmConfig);
        const user = realm.objects<IUserSchema>(Schemas.User)[0];
        if (user) {
            const wallet = realm.objectForPrimaryKey<IWalletSchema>(Schemas.Wallet, user.activeWalletId);
            return wallet || null;
        }
        return null;
    } catch (error) {
        console.error("Error in getActiveWallet:", error);
        throw error;
    }
}

export const getAccountByWalletId = async (walletId: ObjectId): Promise<IAccountSchema[]> => {
    try {
        const realm = await Realm.open(realmConfig);
        const wallet = realm.objectForPrimaryKey<IWalletSchema>(Schemas.Wallet, new ObjectId(walletId));
        if (wallet) {
            const accounts = wallet.accounts.map((accountId) => {
                return realm.objectForPrimaryKey<IAccountSchema>(Schemas.Account, new ObjectId(accountId));
            });
            return accounts as IAccountSchema[];
        }
        return [];
    } catch (error) {
        console.error("Error in getAccountByWalletId:", error);
        throw error;
    }
}

export const getActiveWalletAccounts = async (): Promise<IAccountSchema[]> => {
    try {
        console.log("someone called getActiveWalletAccounts")
        const realm = await Realm.open(realmConfig);
        const user = realm.objects<IUserSchema>(Schemas.User)[0];
        const activeWallet = realm.objectForPrimaryKey<IWalletSchema>(Schemas.Wallet, user?.activeWalletId);
        if (!activeWallet) throw new Error("Active wallet not found")
        if (activeWallet) {
            const accounts = activeWallet.accounts.map((accountId) => {
                return realm.objectForPrimaryKey<IAccountSchema>(Schemas.Account, new ObjectId(accountId));
            });
            return accounts as IAccountSchema[];
        }
        return [];
    } catch (error) {
        console.error("Error in getActiveWalletAccounts:", error);
        throw error;
    }
}
export const getActiveAccountAddress = async (): Promise<IAddressSchema> => {
    try {
        const realm = await Realm.open(realmConfig);
        const user = realm.objects<IUserSchema>(Schemas.User)[0];
        const wallet = realm.objectForPrimaryKey<IWalletSchema>(Schemas.Wallet, user!.activeWalletId!);
        if (!wallet) throw new Error("Wallet not found")
        const account = realm.objectForPrimaryKey<IAccountSchema>(Schemas.Account, wallet.activeAccountId!);
        if (!account) throw new Error("Account not found")
        const address = realm.objectForPrimaryKey<IAddressSchema>(Schemas.Address, account!.activeAddressId!);
        if (!address) throw new Error("Address not found")
        return address as IAddressSchema;
    } catch (error) {
        console.error("Error in getActiveAccountAddress:", error);
        throw error;
    }
}
export const getAccountActiveAddress = async (accountId: ObjectId): Promise<IAddressSchema> => {
    try {
        const realm = await Realm.open(realmConfig);
        const account = realm.objectForPrimaryKey<IAccountSchema>(Schemas.Account, accountId);
        if (!account) throw new Error("Account not found")
        const address = realm.objectForPrimaryKey<IAddressSchema>(Schemas.Address, account!.activeAddressId!);
        if (!address) throw new Error("Address not found")
        return address as IAddressSchema;
    } catch (error) {
        console.error("Error in getAccountActiveAddress:", error);
        throw error;
    }
}
export const getActiveAccountAddresses = async (): Promise<IAddressSchema[]> => {
    try {
        const realm = await Realm.open(realmConfig);
        const user = realm.objects<IUserSchema>(Schemas.User)[0];
        const wallet = realm.objectForPrimaryKey<IWalletSchema>(Schemas.Wallet, user!.activeWalletId!);
        if (!wallet) throw new Error("Wallet not found")
        const account = realm.objectForPrimaryKey<IAccountSchema>(Schemas.Account, wallet.activeAccountId!);
        if (!account) throw new Error("Account not found")
        const addresses = account.addresses.map((addressId) => {
            return realm.objectForPrimaryKey<IAddressSchema>(Schemas.Address, new ObjectId(addressId));
        });
        return addresses as IAddressSchema[];
    } catch (error) {
        console.error("Error in getActiveAccountAddreses:", error);
        throw error;
    }
}
export const getActiveUserWallets = async (): Promise<IWalletSchema[]> => {
    try {
        const realm = await Realm.open(realmConfig);
        const user = realm.objects<IUserSchema>(Schemas.User)[0];
        const wallets = user?.wallets.map((walletId) => {
            return realm.objectForPrimaryKey<IWalletSchema>(Schemas.Wallet, new ObjectId(walletId));
        });
        return wallets as IWalletSchema[];
    } catch (error) {
        console.error("Error in getActiveUserWallets:", error);
        throw error;
    }
}
export const getActiveAccount = async (): Promise<IAccountSchema | null> => {
    try {
        const realm = await Realm.open(realmConfig);
        const user = realm.objects<IUserSchema>(Schemas.User)[0];
        if (!user?.activeWalletId) return null;
        const wallet = realm.objectForPrimaryKey<IWalletSchema>(Schemas.Wallet, user!.activeWalletId!);
        const account = realm.objectForPrimaryKey<IAccountSchema>(Schemas.Account, wallet!.activeAccountId!);
        return account
    } catch (error) {
        console.error("Error in getActiveAccount:", error);
        throw error;
    }
}

export const switchNetwork = async (networkName: networkNameTypes) => {
    try {
        const realm = await Realm.open(realmConfig);
        const user = realm.objects<IUserSchema>(Schemas.User)[0];
        if (!user?.activeWalletId) return null;
        const wallet = realm.objectForPrimaryKey<IWalletSchema>(Schemas.Wallet, user!.activeWalletId!);
        // lets update the wallets active account name as well with an account with the same network name
        const accounts = await getAccountByWalletId(new ObjectId(wallet!._id));
        const account = accounts.find((account) => account.networkName === networkName)
        if (!account) throw new Error("Account not found")
        updateWallet(wallet!._id, { activeNetworkName: networkName, activeAccountId: new ObjectId(account._id) });
        // updateWallet(wallet!._id, { activeNetworkName: networkName });
        // updateAccount(wallet!.activeAccountId!, { networkName: networkName });
        return wallet!
    } catch (error) {
        console.error("Error in switchNetwork:", error);
        throw error;
    }
}

export const getAllAccount = async (): Promise<IAccountSchema[]> => {
    try {
        const realmInstance = await Realm.open(realmConfig);
        const data = realmInstance.objects<IAccountSchema>(Schemas.Account);
        return Array.from(data);
    } catch (error) {
        console.error("Error in getAllAccount:", error);
        throw error;
    }
}
// Update other functions similarly

export const createUser = async (password: string) => {
    try {
        const realmInstance = await Realm.open(realmConfig);
        return realmInstance.write(() => {
            // Check if a user already exists
            const existingUser = realmInstance.objects<IUserSchema>(Schemas.User)[0];

            if (existingUser) {
                // If a user exists, update the user
                existingUser.password = password;
                existingUser.updatedAt = new Date();
            } else {
                // If no user exists, create a new one
                const newUser = realmInstance.create<IUserSchema>(Schemas.User, {
                    _id: new Realm.BSON.ObjectId(),
                    password: password,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                return newUser; // Return the created user
            }
        });
    } catch (error) {
        // Handle any errors that occur during the async operation.
        console.error("Error creating or updating user:", error);
        throw error; // Re-throw the error to handle it at the caller level.
    }
}
export const updateUser = async (data: Partial<IUserSchema>) => {
    try {
        const realmInstance = await Realm.open(realmConfig);
        realmInstance.write(() => {
            const user = realmInstance.objects<IUserSchema>(Schemas.User)[0];
            if (user) {
                user.updatedAt = new Date();
                // Filter keys in 'data' to match the IUserSchema properties
                const validKeys = Object.keys(data).filter((key) =>
                    Object.keys(user).includes(key)
                );
                // Update the user's properties from 'data'
                validKeys.forEach((key) => {
                    (user as any)[key as keyof IUserSchema] = data[key as keyof IUserSchema];
                });
            }
        });
    } catch (error) {
        // Handle any errors that occur during the async operation.
        console.error("Error updating user:", error);
        throw error; // Re-throw the error to handle it at the caller level.
    }
};
type createWalletProps = {
    passphrase: string,
    name?: string,
    networkName: networkNameTypes
}
export const createWallet = async ({ passphrase, name, networkName }: createWalletProps) => {
    try {
        const realmInstance = await Realm.open(realmConfig);
        return realmInstance.write(async () => {
            const user = realmInstance.objects<IUserSchema>(Schemas.User)[0];
            if (user) {
                const wallet = await realmInstance.create<IWalletSchema>(Schemas.Wallet, {
                    _id: new Realm.BSON.ObjectId(),
                    name: name ? name : `HD Wallet ${user.wallets.length + 1}`,
                    passphrase: passphrase,
                    accounts: [],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    activeNetworkName: networkName,
                });
                await updateUser({ activeWalletId: wallet._id, wallets: [...user.wallets, wallet._id.toString()] })
                return wallet; // Return the created wallet
            }
        });
    } catch (error) {
        // Handle any errors that occur during the async operation.
        console.error("Error creating wallet:", error);
        throw error; // Re-throw the error to handle it at the caller level.
    }
}
export const createAddress = async (address: string, type: string, customHdPath: string, accountId: ObjectId, parentAccountId: ObjectId) => {
    try {
        const realmInstance = await Realm.open(realmConfig);
        return realmInstance.write(() => {
            const user = realmInstance.objects<IUserSchema>(Schemas.User)[0];
            if (user) {
                const account = realmInstance.objectForPrimaryKey<IAccountSchema>(Schemas.Account, accountId);
                if (account) {
                    const data = realmInstance.create<IAddressSchema>(Schemas.Address, {
                        _id: new Realm.BSON.ObjectId(),
                        address: address,
                        type: type,
                        customHdPath: customHdPath,
                        parentAccountId
                    });
                    updateAccount(accountId, { addresses: [...account.addresses, data._id.toString()], activeAddressId: data._id })
                    return data; // Return the created address
                }
            }
            return null
        });
    } catch (error) {
        // Handle any errors that occur during the async operation.
        console.error("Error creating address:", error);
        throw error; // Re-throw the error to handle it at the caller level.
    }
}
export const findAddressesByParentAccountId = async (parentAccountId: ObjectId): Promise<IAddressSchema[]> => {
    try {
        const realmInstance = await Realm.open(realmConfig);
        const data = realmInstance.objects<IAddressSchema>(Schemas.Address).filtered('parentAccountId = $0', parentAccountId);
        return Array.from(data);
    } catch (error) {
        console.error("Error in findAddressesByParentAccountId:", error);
        throw error;
    }
}
type createAccountProps = {
    privateKey: string,
    addresses: IAddressSchema[],
    walletId: ObjectId,
    name?: string,
    selectedAddressIndex: number,
    networkName?: networkNameTypes
}
export const createAccount = async ({ privateKey, addresses, walletId, name, selectedAddressIndex, networkName = "testnet" }: createAccountProps) => {
    console.log("createAccount called", privateKey, addresses, walletId, name, selectedAddressIndex, networkName)
    try {
        const realmInstance = await Realm.open(realmConfig);

        const user = realmInstance.objects<IUserSchema>(Schemas.User)[0];
        if (!user) {
            throw new Error("User not found");
        }

        const wallet = realmInstance.objectForPrimaryKey<IWalletSchema>(Schemas.Wallet, walletId);
        if (!wallet) {
            throw new Error("Wallet not found");
        }

        let createdAddresses: ObjectId[] = [];

        return realmInstance.write(async () => {
            const lengthOfAccountsWithSameNetworkNameAsNetworkNameAndParentWalletIsWalletId = realmInstance
                .objects<IAccountSchema>(Schemas.Account)
                .filtered('networkName = $0 AND parentWalletId = $1', networkName, walletId);
            const resultLength = lengthOfAccountsWithSameNetworkNameAsNetworkNameAndParentWalletIsWalletId.length;
            console.log("lengthOfAccountsWithSameNetworkNameAsNetworkNameAndParentWalletIsWalletId", lengthOfAccountsWithSameNetworkNameAsNetworkNameAndParentWalletIsWalletId)
            const account = await realmInstance.create<IAccountSchema>(Schemas.Account, {
                _id: new Realm.BSON.ObjectId(),
                name: name ? name : `Account ${resultLength + 1}`,
                privateKey: privateKey,
                createdAt: new Date(),
                updatedAt: new Date(),
                parentWalletId: walletId,
                networkName: networkName ? networkName : wallet.activeNetworkName,
            });
            for (const address of addresses) {
                const addressData = await createAddress(address.address, address.type, address.customHdPath!, account._id, account._id);
                if (!addressData) throw new Error("error creating address from create account function");
                createdAddresses.push(addressData._id);
            }
            updateAccount(account._id, {
                addresses: createdAddresses.map((address) => address.toString()),
                activeAddressId: createdAddresses[selectedAddressIndex]
            });
            updateWallet(walletId, {
                accounts: [...wallet.accounts, account._id.toString()],
                activeAccountId: account._id,
                activeNetworkName: networkName ? networkName : wallet.activeNetworkName
            });
            // updateUser({ activeWalletId: walletId });
            return account
        });
    } catch (error) {
        // Handle any errors that occur during the async operation.
        console.error("Error creating account:", error);
        throw error; // Re-throw the error to handle it at the caller level.
    }
};
export const updateWallet = (walletId: ObjectId, data: Partial<IWalletSchema>) => {
    const realm = Realm.open(realmConfig);
    realm.then((realmInstance) => {
        realmInstance.write(() => {
            const user = realmInstance.objects<IUserSchema>(Schemas.User)[0];
            if (user) {
                const wallet = realmInstance.objectForPrimaryKey<IWalletSchema>(Schemas.Wallet, walletId);
                if (wallet) {
                    wallet.updatedAt = new Date();
                    // Filter keys in 'data' to match the IWalletSchema properties
                    const validKeys = Object.keys(data).filter((key) =>
                        Object.keys(wallet).includes(key)
                    );
                    // Update the wallet's properties from 'data'
                    validKeys.forEach((key) => {
                        (wallet as any)[key as keyof IWalletSchema] = data[key as keyof IWalletSchema];
                    });
                }
            }
        });
    });
}
export const updateAccount = (accountId: ObjectId, data: Partial<IAccountSchema>) => {
    const realm = Realm.open(realmConfig);
    realm.then((realmInstance) => {
        realmInstance.write(() => {
            const user = realmInstance.objects<IUserSchema>(Schemas.User)[0];
            if (user) {
                const account = realmInstance.objectForPrimaryKey<IAccountSchema>(Schemas.Account, accountId);
                if (account) {
                    account.updatedAt = new Date();
                    // Filter keys in 'data' to match the IAccountSchema properties
                    const validKeys = Object.keys(data).filter((key) =>
                        Object.keys(account).includes(key)
                    );
                    // Update the account's properties from 'data'
                    validKeys.forEach((key) => {
                        (account as any)[key as keyof IAccountSchema] = data[key as keyof IAccountSchema];
                    });
                }
            }
        });
    });
}


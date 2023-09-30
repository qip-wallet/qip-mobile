// Create a custom hook for fetching user data
import { useEffect, useState } from 'react';
import {
    masterUserQuery, IUserSchema, IAccountSchema,
    IWalletSchema, getActiveWallet, getActiveAccountAddresses,
    getActiveAccount,
    getActiveUserWallets, getActiveWalletAccounts, IAddressSchema, getActiveAccountAddress
} from '../realm';

export const useUserData = () => {
    const [data, setData] = useState({
        user: {} as IUserSchema,
        activeWallet: {} as IWalletSchema,
        activeAccount: {} as IAccountSchema,
        activeWalletAccounts: [] as IAccountSchema[],
        activeUserWallets: [] as IWalletSchema[],
        activeAccountAddress: {} as IAddressSchema,
        activeAddresses: [] as IAddressSchema[],
    });

    const reloadUserData = async () => {
        try {
            const [
                user,
                activeWallet,
                activeAccount,
                activeWalletAccounts,
                activeUserWallets,
                activeAccountAddress,
                activeAddresses] = await Promise.all([
                    masterUserQuery(),
                    getActiveWallet(),
                    getActiveAccount(),
                    getActiveWalletAccounts(),
                    getActiveUserWallets(),
                    getActiveAccountAddress(),
                    getActiveAccountAddresses(),
                ]);
            setData((prev) => ({
                ...prev,
                user: user!,
                activeWallet: activeWallet!,
                activeAccount: activeAccount!,
                activeWalletAccounts: activeWalletAccounts!,
                activeUserWallets: activeUserWallets!,
                activeAccountAddress: activeAccountAddress!,
                activeAddresses: activeAddresses!
            }));
        } catch (error: any) {
            console.error("error ==> ", error.message);
        }
    };

    useEffect(() => {
        reloadUserData(); // Load user data initially
    }, []);

    return { ...data, reloadUserData }; // Include reloadUserData function in the returned object
};

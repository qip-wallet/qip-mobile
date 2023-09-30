import React, { useState, createContext, ReactNode, useContext } from 'react';
import { ObjectId } from 'bson';

export type AccountData = {
    name?: string;
    privateKey: string;
    address: {
        address: string;
        type: string;
        customHdPath?: string;
    };
    createdAt: Date;
    updatedAt?: Date;
    parentWalletId: ObjectId;
};

type AccountCreationContextType = {
    accountData: AccountData | null;
    setAccountCreationData: (data: AccountData | null) => void;
};

export const AccountCreationContext = createContext<AccountCreationContextType | null>(null);

export const AccountCreationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [accountData, setAccountData] = useState<AccountData | null>(null);
    // Function to set account data
    const setAccountCreationData = (data: AccountData | null) => {
        setAccountData(data);
    };
    return (
        <AccountCreationContext.Provider
            value={{
                accountData,
                setAccountCreationData,
            }}
        >
            {children}
        </AccountCreationContext.Provider>
    );
};

// Custom hook for using the context
export const useAccountCreationContext = (): AccountCreationContextType | null => {
    const context = useContext(AccountCreationContext);
    if (!context) {
        throw new Error('useAccountCreationContext must be used within an AccountCreationProvider');
    }
    return context;
};

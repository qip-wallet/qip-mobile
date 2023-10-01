import 'react-native-get-random-values'
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import { wordList } from './words';
import { ObjectId } from 'bson';
import { IAddressSchema } from '../../realm';

class MiscManager {
    static async hashPassword(password: string): Promise<string> {
        try {
            const hashedPassword = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                password
            );
            return hashedPassword
        } catch (error: any) {
            throw new Error('Error hashing PASSWORD: ' + error.message);
        }
    }
    static async generateRandomId(): Promise<string> {
        try {
            const randomBytes = Crypto.getRandomValues(new Uint8Array(16));
            const hexString = Array.from(randomBytes)
                .map((b) => b.toString(16).padStart(2, '0'))
                .join('');
            return hexString;
        } catch (error: any) {
            throw new Error('Error generating random ID: ' + error.message);
        }
    }
    static async authenticateWithPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            const enteredHashedPassword = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                plainPassword
            );

            return hashedPassword === enteredHashedPassword;
        } catch (error: any) {
            throw new Error('Error retrieving or hashing PASSWORD: ' + error.message);
        }
    }
    static async generateRandomPassphrase(length: number, separator: string): Promise<string> {
        const words = wordList;
        const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

        let passphrase = getRandomWord();
        for (let i = 1; i < length; i++) {
            passphrase += separator + getRandomWord();
        }

        return passphrase;
    }
    static async generateWalletAddress(quantity: number): Promise<IAddressSchema[] | any[]> {
        try {
            const walletTypes = ['ETH', 'BTC', 'BCH'];
            // generate 3 random addresses
            const addresses = [] as IAddressSchema[] | any;
            for (let i = 0; i < quantity; i++) {
                const randomBytes = Crypto.getRandomValues(new Uint8Array(16));
                const hexString = Array.from(randomBytes)
                    .map((b) => b.toString(16).padStart(2, '0'))
                    .join('');
                addresses.push({
                    address: hexString, type: walletTypes[i],
                    customHdPath: '',
                });
            }
            return addresses;
        } catch (error: any) {
            throw new Error('Error generating random ID: ' + error.message);
        }
    }
}

export default MiscManager;



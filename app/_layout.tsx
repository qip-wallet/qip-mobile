import React from 'react';
import 'react-native-get-random-values'
import { Stack } from 'expo-router';
import { RealmProvider } from '../app/realm';
import { ReactNode } from 'react';
import { expo } from '../app.json';
import * as Font from 'expo-font';
import { useFonts, Manrope_400Regular, Manrope_600SemiBold, Manrope_200ExtraLight, Manrope_300Light, Manrope_500Medium, Manrope_700Bold, Manrope_800ExtraBold } from '@expo-google-fonts/manrope';
import { Sora_400Regular, Sora_700Bold, Sora_600SemiBold } from '@expo-google-fonts/sora';
import { Inter_100Thin, Inter_700Bold } from '@expo-google-fonts/inter';
import { AccountCreationProvider } from './context/data';
// Import other fonts you need
type Props = {
    children: ReactNode;
};
console.log("Server is running on localhost:3000")
// Define your font families
export type FontFamily =
    "Manrope_400Regular"
    | "Manrope_600SemiBold"
    | "Manrope_200ExtraLight"
    | "Manrope_300Light"
    | "Manrope_500Medium"
    | "Manrope_700Bold"
    | "Manrope_800ExtraBold"
    | "Sora_400Regular"
    | "Sora_700Bold"
    | "Sora_600SemiBold"
    | "Inter_100Thin"
    | "Inter_700Bold"
// Add more font families as needed

const appName = expo.name;

export default function AppLayout({ children }: Props) {
    const [fontsLoaded] = useFonts({
        Manrope_400Regular,
        Manrope_600SemiBold,
        Manrope_200ExtraLight,
        Manrope_300Light,
        Manrope_500Medium,
        Manrope_700Bold,
        Manrope_800ExtraBold,
        Sora_400Regular,
        Sora_700Bold,
        Sora_600SemiBold,
        Inter_100Thin,
        Inter_700Bold,
    });

    if (!fontsLoaded) {
        // Fonts are still loading, you can return a loading screen or null
        return null;
    }

    // Now you can use these fonts in your styles
    const textStyle = {
        fontFamily: 'Manrope_400Regular',
        fontSize: 16,
        fontStyle: 'italic', // Add slant or italic style here
    };

    return (
        <RealmProvider>
            <AccountCreationProvider>
                <Stack screenOptions={{ headerShown: false }} >
                </Stack>
            </AccountCreationProvider>
        </RealmProvider>
    );
}

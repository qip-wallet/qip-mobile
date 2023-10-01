import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { Link } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import { createUser, masterUserQuery, getAllAccount, updateUser } from '../../realm';
import CoreStyles from '../../src/core/index';
import Styles from '../style';
import LinearGradientButton from '../../src/components/GradientButton';
import { dynamicFontSize } from '../style';
import { router } from 'expo-router';
import MiscManager from '../../src/utils/misc';
import { appRoutes } from '../../src/utils/routes';
import { Ionicons } from '@expo/vector-icons';
export default function Login() {
    const [password, setPassword] = useState("")
    const handleNext = async () => {
        try {
            const user = await masterUserQuery()
            if (!user) {
                return setError("no wallet associated with this app");
            }
            const checkPassword = await MiscManager.authenticateWithPassword(password, user.password)
            if (!checkPassword) {
                return setError("password incorrect")
            }
            if (!user.activeWalletId || user.wallets.length <= 0) {
                return router.replace(appRoutes.auth.generatePassphrase)
            }
            const accounts = await getAllAccount()
            if (accounts.length <= 1) {
                return router.replace(appRoutes.auth.generatePassphrase)
            }
            await updateUser({ lastAuthenticated: new Date(Date.now()) })
            return router.replace(appRoutes.tabs.home);

        } catch (error: any) {
            console.log(error);
        }
    };
    const [error, setError] = useState<string | null>("")

    return (
        <View style={CoreStyles.box({})}>
            <Text style={[CoreStyles.text({ fontFamily: 'Sora_700Bold' }), Styles.title]}>Welcome back to Qip</Text>
            <View style={[CoreStyles.space(), { backgroundColor: 'transparent' }]} />
            <Text style={[CoreStyles.text({ color: "#A3A1A1", fontFamily: "Manrope_600SemiBold" }), Styles.text]}>Log into your wallet</Text>
            <View style={[CoreStyles.space({ height: 30 }), { backgroundColor: 'transparent' }]} />
            <TextInput
                style={CoreStyles.inputField()}
                onChangeText={(text) => {
                    setError(null)
                    setPassword(text)
                }}
                placeholder="Enter your password"
                value={password}
                secureTextEntry={true}
            />
            <View style={[CoreStyles.space({ height: 30 }), { backgroundColor: 'transparent' }]} />
            {
                error && (<Text style={[CoreStyles.text({ color: "#FF0000", fontFamily: "Manrope_300Light" }), Styles.text]}>{error}</Text>)

            }
            <View style={[CoreStyles.space(), { backgroundColor: 'transparent' }]} />
            <Pressable
                onPress={() => {
                    handleNext();
                }}
                style={[Styles.button, { padding: 0 }]}>
                <LinearGradientButton
                    onPress={() => { null }}
                    style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", height: 50 }}
                >
                    <Text style={{ fontFamily: "Sora_600SemiBold", fontWeight: '600', fontSize: dynamicFontSize(16) }}>Login</Text>
                </LinearGradientButton>
            </Pressable>
            <Pressable
                onPress={() => {
                    router.replace(appRoutes.auth.password)
                }}
                style={[Styles.button, { padding: 0, marginTop: 10 }]}>
                <LinearGradientButton
                    onPress={() => { null }}
                    style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", height: 50 }}
                >
                    <Text style={{ fontFamily: "Sora_600SemiBold", fontWeight: '600', fontSize: dynamicFontSize(16) }}>Create Account</Text>
                </LinearGradientButton>
            </Pressable>
            <Pressable onPress={() => {
                alert("coming soon, use password for now")
            }} style={{ marginTop: 40 }}>
                <Ionicons name='finger-print' size={50} />
            </Pressable>
        </View>
    );
}

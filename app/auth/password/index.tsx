import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Link } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRealm, createUser, updateUser } from '../../realm';
import CoreStyles from '../../src/core/index';
import Styles from '../style';
import LinearGradientButton from '../../src/components/GradientButton';
import { dynamicFontSize } from '../style';
import { router } from 'expo-router';
import MiscManager from '../../src/utils/misc';
import { appRoutes } from '../../src/utils/routes';
export default function Auth() {
    const realm = useRealm();
    type Data = {
        password: string;
        confirmPassword: string;
    }
    const [data, setData] = useState<Data | any>({
        password: "",
        confirmPassword: ""
    });
    const handleNext = async () => {
        try {
            if (data.password !== data.confirmPassword) {
                return;
            }
            const errorCheck = handleError();
            if (!errorCheck) {
                return;
            }
            const pwd = await MiscManager.hashPassword(data.password);
            await createUser(pwd);
            router.replace(appRoutes.auth.generatePassphrase);
        } catch (error: any) {
            console.log(error);
        }

    };
    const [error, setError] = useState<string | null>("")
    const handleError = () => {
        if (data.password !== data.confirmPassword) {
            setError("Passwords do not match");
            return false;
        } else if (data.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }
        else {
            setError(null);
            return true;
        }
    }
    const handleChange = useCallback(
        (text: string, name: string) => {
            setData((prevState: Data) => ({
                ...prevState,
                [name]: text,
            }));
        },
        [data],
    )
    return (
        <View style={CoreStyles.box({})}>

            <Text style={[CoreStyles.text({ fontFamily: 'Sora_700Bold' }), Styles.title]}>Create a secure password</Text>
            <View style={[CoreStyles.space(), { backgroundColor: 'transparent' }]} />
            <Text style={[CoreStyles.text({ color: "#A3A1A1", fontFamily: "Manrope_600SemiBold" }), Styles.text]}>This is your access to your wallet</Text>
            <View style={[CoreStyles.space({ height: 30 }), { backgroundColor: 'transparent' }]} />
            <TextInput
                style={CoreStyles.inputField()}
                onChangeText={text => handleChange(text, "password")}
                placeholder="Enter your password"
                secureTextEntry={true}
            />
            <View style={CoreStyles.space()} />
            <TextInput
                style={CoreStyles.inputField()}
                onChangeText={text => handleChange(text, "confirmPassword")}
                placeholder="Confirm Password"
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
                    <Text style={{ fontFamily: "Sora_600SemiBold", fontWeight: '600', fontSize: dynamicFontSize(16) }}>Next</Text>
                </LinearGradientButton>
            </Pressable>
            <Pressable
                onPress={() => {
                    router.replace(appRoutes.auth.login)
                }}
                style={[Styles.button, { padding: 0, marginTop: 10 }]}>
                <LinearGradientButton
                    onPress={() => { null }}
                    style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", height: 50 }}
                >
                    <Text style={{ fontFamily: "Sora_600SemiBold", fontWeight: '600', fontSize: dynamicFontSize(16) }}>Already have an account</Text>
                </LinearGradientButton>
            </Pressable>
        </View>
    );
}

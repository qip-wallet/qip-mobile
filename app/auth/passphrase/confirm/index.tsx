import { View, Text, Dimensions, TextInput, FlatList, KeyboardAvoidingView, Image, Platform, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles, { dynamicFontSize } from '../../style'
import CoreStyles from '../../../src/core/index';
import LinearGradientButton from '../../../src/components/GradientButton';
import { updateUser, getActiveWallet, IWalletSchema } from '../../../realm';
import { router } from 'expo-router';
import { appRoutes } from '../../../src/utils/routes';
const { width, height } = Dimensions.get('screen');

const ConfirmPassphrase = () => {
    const [walletData, setWalletData] = useState<IWalletSchema>()
    useEffect(() => {
        const fetchWalletData = async () => {
            const data = await getActiveWallet();
            if (!data) return console.error("No wallet data")
            setWalletData(data);
        };
        fetchWalletData();
    }, []);
    const [passphrase, setPassphrase] = useState<string[]>([
    ]);
    const handleInput = (text: string, index: number) => {
        const newPassphrase = [...passphrase];
        newPassphrase[index] = text;
        setPassphrase(newPassphrase);
    }
    const handleSubmit = () => {
        if (passphrase.join(" ") !== walletData?.passphrase) {
            alert("Passphrase matched")
        } else {
            updateUser({ step: 2 });
            router.push(appRoutes.auth.chooseAddress)
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={{ width: "100%", alignItems: "center" }}>
                <View style={{ width: width * 0.8 }}>
                    <Text style={[CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(24) }), { textAlign: "center" }]}>Create a new HD wallet </Text>
                    <Text style={[CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(16) }), { textAlign: "center" }]}>Re-enter your Secret Recovery Phrase</Text>
                    <View style={[CoreStyles.space({ height: dynamicFontSize(10) }), { backgroundColor: 'transparent' }]} />
                    <Text style={[CoreStyles.text({ color: "#A3A1A1", fontFamily: "Manrope_600SemiBold", fontSize: dynamicFontSize(14) }), { textAlign: "center" }]}>This is the only means to recover your wallet. Do not share publicly</Text>
                </View>
                <View style={[CoreStyles.space({ height: 30 }), { backgroundColor: 'transparent' }]} />
                <View style={[CoreStyles.space({ height: dynamicFontSize(10) }), { backgroundColor: 'transparent' }]} />
                <FlatList
                    style={{ gap: 10, width: "100%" }}
                    data={Array.from(Array(12).keys())}
                    renderItem={({ item, index }) => (
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", gap: 10, justifyContent: "flex-end" }}>
                            <Text style={[CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(14) }), { textAlign: "center" }]}>
                                {index + 1}.
                            </Text>
                            <TextInput
                                value={passphrase[index]}
                                onChangeText={(text) => handleInput(text, index)}
                                style={{ width: width * 0.3, height: 40, backgroundColor: '#D9D9D966', paddingLeft: 20 }}
                            />
                            <View style={[CoreStyles.space({ height: dynamicFontSize(60) }), { backgroundColor: 'transparent' }]} />
                        </View>
                    )}
                    //Setting the number of column
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between', gap: 10 }}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={[CoreStyles.space({ height: dynamicFontSize(20) }), { backgroundColor: 'transparent' }]} />
                <TouchableOpacity onPress={handleSubmit} style={[styles.button, { backgroundColor: "transparent", width: width - 40, height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }]}>
                    <LinearGradientButton onPress={() => { null }} style={{ width: "100%", height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontFamily: "Sora_600SemiBold", fontWeight: '600', fontSize: dynamicFontSize(16), color: "black" }}>Continue</Text>
                    </LinearGradientButton>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
    )
}


export default ConfirmPassphrase
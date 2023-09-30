import { View, Text, Dimensions, TextInput, FlatList, KeyboardAvoidingView, Image, Platform, Button, Clipboard, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles, { dynamicFontSize } from '../../style'
import CoreStyles from '../../../src/core/index';
import MiscManager from '../../../src/utils/misc';
// import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { Pressable } from 'react-native';
// import { useClipboard } from '@react-native-clipboard/clipboard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import LinearGradientButton from '../../../src/components/GradientButton';
import { Link, router } from 'expo-router';
const { width, height } = Dimensions.get('screen');
import { useRealm, masterUserQuery, createWallet, updateUser } from '../../../realm';
import { appRoutes } from '../../../src/utils/routes';
const EnterPassPhrase = () => {
    const [passPhrase, setPassPhrase] = useState<string[]>([]);
    const [isChecked, setChecked] = useState(false);
    const handleGeneratePassPhrase = async () => {
        const passPhrase = await MiscManager.generateRandomPassphrase(12, "-");
        setPassPhrase(passPhrase.split("-"));
    }
    useEffect(() => {
        handleGeneratePassPhrase();
    }, [])

    const handleSubmit = async () => {
        try {
            const data = await createWallet({ passphrase: passPhrase.join(" "), networkName: "testnet" });
            updateUser({ activeWalletId: data?._id });
            router.replace(appRoutes.auth.confirmPassphrase)
        } catch (error) {
            console.error("geenrate file", error)
        }
    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={{ width: "100%", alignItems: "center" }}>
                <View style={{ width: width * 0.8 }}>
                    <Text style={[CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(24) }), { textAlign: "center" }]}>Create a new HD wallet </Text>
                    <Text style={[CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(16) }), { textAlign: "center" }]}>Secret Recovery Phrase</Text>
                    <View style={[CoreStyles.space({ height: dynamicFontSize(10) }), { backgroundColor: 'transparent' }]} />
                    <Text style={[CoreStyles.text({ color: "#A3A1A1", fontFamily: "Manrope_600SemiBold", fontSize: dynamicFontSize(14) }), { textAlign: "center" }]}>This is the only means to recover your wallet. Do not share publicly</Text>
                </View>
                <View style={[CoreStyles.space({ height: 30 }), { backgroundColor: 'transparent' }]} />

                <Pressable style={{ alignItems: "center", flexDirection: "row", gap: 5 }} onPress={() => {
                    Clipboard.setString(passPhrase.join(" "));
                    alert("Copied to clipboard")
                }}>
                    <MaterialCommunityIcons name="content-copy" size={24} color="black" />
                    <Text style={styles.text}>
                        Copy to clipboard
                    </Text>
                </Pressable>
                <View style={[CoreStyles.space({ height: dynamicFontSize(10) }), { backgroundColor: 'transparent' }]} />
                <FlatList
                    style={{ gap: 10, width: "100%" }}
                    data={passPhrase}
                    renderItem={({ item, index }) => (
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", gap: 10, justifyContent: "flex-end" }}>
                            <Text style={[CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(14) }), { textAlign: "center" }]}>
                                {index + 1}.
                            </Text>
                            <TextInput
                                value={item}
                                style={{ width: width * 0.3, height: 40, backgroundColor: '#D9D9D966', paddingLeft: 20 }}
                                // disabled
                                editable={false}
                            />
                            <View style={[CoreStyles.space({ height: dynamicFontSize(60) }), { backgroundColor: 'transparent' }]} />
                        </View>
                    )}
                    //Setting the number of column
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between', gap: 10 }}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={[CoreStyles.space({ height: dynamicFontSize(10) }), { backgroundColor: 'transparent' }]} />

                <View style={{ flexDirection: "row", gap: 5 }}>
                    <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#C596FF' : undefined}
                    />
                    <Text style={[CoreStyles.text({ color: "#A3A1A1", fontFamily: "Manrope_600SemiBold", fontSize: dynamicFontSize(14) }), { textAlign: "center" }]}>I have saved my recovery phrase</Text>
                </View>
                <View style={[CoreStyles.space({ height: dynamicFontSize(40) }), { backgroundColor: 'transparent' }]} />
                {isChecked ?
                    <TouchableOpacity onPress={handleSubmit} style={[styles.button, { backgroundColor: "transparent", width: width - 40, height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }]}>
                        <LinearGradientButton onPress={() => { null }} style={{ width: "100%", height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontFamily: "Sora_600SemiBold", fontWeight: '600', fontSize: dynamicFontSize(16), color: "black" }}>Continue</Text>
                        </LinearGradientButton>
                    </TouchableOpacity>

                    : <TouchableOpacity disabled={!isChecked} style={[styles.button, { backgroundColor: "#D9D9D94D", width: width - 40, height: 50 }]}>
                        <Link href="/auth/passphrase/confirm">
                            <Text style={{ fontFamily: "Sora_600SemiBold", fontWeight: '600', fontSize: dynamicFontSize(16), color: "gray" }}>Continue</Text>
                        </Link>
                    </TouchableOpacity>}
            </View>
        </KeyboardAvoidingView >
    )
}


export default EnterPassPhrase
import { View, Text, Pressable, TextInput, Dimensions, FlatList, TouchableOpacity, Clipboard, ScrollView } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles, { dynamicFontSize } from '../../../../../app/auth/style';
import CoreStyles from '../../../../../app/src/core/index';
import React, { useContext, useEffect, useState } from 'react';
import LinearGradientButton from '../../../../../app/src/components/GradientButton';
import Checkbox from 'expo-checkbox';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MiscManager from '../../../../../app/src/utils/misc';
import { AccountCreationContext, AccountData } from '../../../../../app/context/data';
import { useUserData } from '../../../../context/index';
const { width, height } = Dimensions.get("window");
export default function GeneratePassphrase() {
    const [passPhrase, setPassPhrase] = useState<string[]>([]);
    const [isChecked, setChecked] = useState(false);
    const handleGeneratePassPhrase = async () => {
        const passPhrase = await MiscManager.generateRandomPassphrase(12, "-");
        setPassPhrase(passPhrase.split("-"));
    }
    // const { networkName } = useLocalSearchParams()
    const { activeWallet } = useUserData()
    useEffect(() => {
        handleGeneratePassPhrase();
    }, [])
    const context = useContext(AccountCreationContext);
    if (!context) {
        return null;
    }

    return (

        <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
            <StatusBar style="auto" />
            <View style={{ width: width }}>
                <Text style={[CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(24) }), { textAlign: "center" }]}>Create a new HD wallet </Text>
                <Text style={[CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(16) }), { textAlign: "center" }]}>Secret Recovery Phrase</Text>
                <View style={[CoreStyles.space({ height: dynamicFontSize(10) }), { backgroundColor: 'transparent' }]} />
                <Text style={[CoreStyles.text({ color: "#A3A1A1", fontFamily: "Manrope_600SemiBold", fontSize: dynamicFontSize(14) }), { textAlign: "center" }]}>This is the only means to recover your wallet. Do not share publicly</Text>
            </View>
            <View style={[CoreStyles.space({ height: 30 }), { backgroundColor: 'transparent', justifyContent: "center", alignItems: "center" }]} />
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
                showsVerticalScrollIndicator={false}
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
            <TouchableOpacity
                style={[styles.button, {
                    opacity: isChecked ? 1 : 0.2,
                    backgroundColor: "transparent", marginBottom: 50, width: width - 40, height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center"
                }]}
                disabled={!isChecked}
                onPress={() => {
                    console.log("active network name", activeWallet.activeNetworkName)
                    router.push({
                        pathname: "/wallet/new/address",
                        params: {
                            passphrase: passPhrase.join(" "),
                            networkName: activeWallet.activeNetworkName
                        }
                    })
                }}

            >
                <LinearGradientButton onPress={() => { null }} style={{ width: "100%", height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontFamily: "Sora_600SemiBold", fontWeight: '600', fontSize: dynamicFontSize(16), color: "black" }}>Continue</Text>
                </LinearGradientButton>
            </TouchableOpacity>
        </SafeAreaView >
    );
}

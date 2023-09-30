import { View, Text, Pressable, TextInput, Dimensions, FlatList, TouchableOpacity, Clipboard } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles, { dynamicFontSize } from '../../../../auth/style';
import CoreStyles from '../../../../src/core/index';
import React, { useContext, useEffect, useState } from 'react';
import { LinearGradientComponent } from '../../../dashboard/1';
import { AccountCreationContext } from '../../../../context/data';
import { ObjectId } from 'bson';
const { width, height } = Dimensions.get("window");
const EnterAccountName = () => {
    const context = useContext(AccountCreationContext);
    if (!context) {
        return null;
    }

    return (
        <View style={{
            alignItems: 'center', justifyContent: 'center',
            padding: 10,
            width: "100%",
        }}>
            <Text
                style={[
                    CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(16) }),
                    {
                        textAlign: 'center',
                    },
                ]}
            >
                Create a New Wallet
            </Text>
            <View style={{ alignItems: "flex-start", flexDirection: "column", gap: 20, marginTop: 30, width: "100%", padding: 10 }}>
                <View style={{ flexDirection: "column", alignItems: "flex-start", gap: 10, width: "100%", justifyContent: "flex-start" }}>
                    <Text
                        style={[
                            CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(14) }),
                            {
                                textAlign: 'left',
                            },
                        ]}
                    >
                        Create Wallet:
                    </Text>
                    <Pressable
                        onPress={() => {
                            router.push("/wallet/new/passphrase")
                        }}
                        style={{
                            padding: 20, borderRadius: 0, backgroundColor: "rgba(217, 217, 217, 0.15)",
                            width: "100%",
                            borderColor: "rgba(217, 217, 217, 1)", borderWidth: 1,
                        }}>
                        <Text
                            style={[
                                CoreStyles.text({ fontFamily: 'Manrope_500Medium', fontSize: dynamicFontSize(10) }),
                                {
                                    textAlign: 'left',
                                },
                            ]}
                        >
                            Use mnemonics to create (12 words)
                        </Text>
                    </Pressable>
                </View>
                <View style={{
                    flexDirection: "column", alignItems: "flex-start", gap: 10, width: "100%",
                    justifyContent: "flex-start", marginTop: 10
                }}>
                    <Text
                        style={[
                            CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(14) }),
                            {
                                textAlign: 'left',
                            },
                        ]}
                    >
                        Restore Wallet:
                    </Text>
                    <Pressable style={{
                        padding: 20, borderRadius: 0, backgroundColor: "rgba(217, 217, 217, 0.15)",
                        width: "100%",
                        borderColor: "rgba(217, 217, 217, 1)", borderWidth: 1,
                    }}>
                        <Text
                            style={[
                                CoreStyles.text({ fontFamily: 'Manrope_500Medium', fontSize: dynamicFontSize(10) }),
                                {
                                    textAlign: 'left',
                                },
                            ]}
                        >
                            Restore your wallet with mnemonics (12 words, 24 words)
                        </Text>
                    </Pressable>
                    <Pressable style={{
                        padding: 20, borderRadius: 0, backgroundColor: "rgba(217, 217, 217, 0.15)",
                        width: "100%",
                        borderColor: "rgba(217, 217, 217, 1)", borderWidth: 1,
                    }}>
                        <Text
                            style={[
                                CoreStyles.text({ fontFamily: 'Manrope_500Medium', fontSize: dynamicFontSize(10) }),
                                {
                                    textAlign: 'left',
                                },
                            ]}
                        >
                            Restore your wallet with private key
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View >
    )
}

export default EnterAccountName;
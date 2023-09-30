import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CoreStyles from '../../../src/core/index';
import { dynamicFontSize } from '../../../auth/style';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import Switch from "../../../src/components/Switch"
const { width, height } = Dimensions.get('window');

export default function SecondPage() {
    const [satsMenu, setSatsMenu] = useState(["BTC", "SATS", "USD"])
    const [showDropDown, setShowDropDown] = useState(false)
    const { recipientAddress } = useLocalSearchParams() as { recipientAddress: string };
    const rates = [
        {
            title: 'Slow',
            subtitle: '1 sat/vB',
            time: 'About 1 hour',
        },
        {
            title: 'Medium',
            subtitle: '1 sat/vB',
            time: 'About 1 hour',
        },
        {
            title: 'Fast',
            subtitle: '1 sat/vB',
            time: 'About 1 hour',
        },
        {
            title: 'Custom',
            subtitle: '1 sat/vB',
            time: 'About 1 hour',
        }
    ];
    const [finalRate, setFinalRate] = useState("")
    const [selectedRate, setSelectedRate] = useState<number>(0)
    const [isCoinControlEnabled, setIsCoinControlEnabled] = useState(false)
    const toggleSwitch = () => {
        setIsCoinControlEnabled(!isCoinControlEnabled)
    }
    return (
        <ScrollView style={{ width: "100%", flex: 1, backgroundColor: "white", height }}>
            <View style={{ width: "100%", flex: 1, backgroundColor: "white", padding: 20, height: height }}>
                <Text
                    style={[CoreStyles.text({ fontFamily: 'Sora_600SemiBold', fontSize: dynamicFontSize(16) }),
                    {
                        textAlign: "center"
                    }
                    ]}>
                    Send to Multiple Addresses
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
                    <Text
                        style={[styles.inputTextSide, { width: "auto" }]}>
                        Coin Control:
                    </Text>
                    <Switch />
                </View>
                <View style={styles.inputContainer}>
                    <Text
                        style={styles.inputTextSide}>
                        Pay To:
                    </Text>
                    <TextInput placeholder='Address' style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                    <Text
                        style={styles.inputTextSide}>
                        Label:
                    </Text>
                    <TextInput placeholder='Label' style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                    <Text
                        style={styles.inputTextSide}>
                        Amount:
                    </Text>
                    <TextInput
                        placeholder='Address' style={[styles.input, { minWidth: 100 }]} />
                    <View>
                        <Pressable
                            onPress={() => {
                                setShowDropDown(!showDropDown)
                            }}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 5,
                                backgroundColor: "#c394ff",
                                paddingVertical: 10,
                                paddingHorizontal: 25
                            }}>
                            <Text style={[styles.inputTextSide, { width: "auto" }]}>
                                SATS
                                <Ionicons name='chevron-down' size={15} color="black" />
                            </Text>
                        </Pressable>
                        {!showDropDown ? (
                            <View style={{ position: "relative", backgroundColor: "#f7f7f7", padding: 10, gap: 5 }}>
                                {
                                    satsMenu.map((item, index) => {
                                        return (
                                            <Pressable
                                                onPress={() => {
                                                    setShowDropDown(!showDropDown)
                                                }}
                                                key={index} style={{
                                                    borderBottomColor: "gray",
                                                    borderBottomWidth: 0.5,
                                                    padding: 10
                                                }}>
                                                <Text style={styles.inputTextSide}>
                                                    {item}
                                                </Text>
                                            </Pressable>
                                        )
                                    })
                                }
                            </View>
                        ) : null}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    input: {
        borderColor: "#D9D9D9",
        borderWidth: 0.5,
        padding: 10,
        backgroundColor: "rgba(217, 217, 217, 0.15)",
        width: "100%", // Ensure the input takes the full width of the container
    },
    inputTextSide: {
        ...CoreStyles.text({ fontFamily: 'Sora_600SemiBold', fontSize: dynamicFontSize(12) }),
        textAlign: "left",
        width: 80,
    },
    inputContainer: {
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",
        justifyContent: "space-between",
        gap: 15,
        flexWrap: "wrap",
        width: "100%",
        // Add overflow property to the input container
        overflow: "hidden", // This will clip the overflowing text
    },
});

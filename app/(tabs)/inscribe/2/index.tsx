import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CoreStyles from '../../../src/core/index';
import { dynamicFontSize } from '../../../auth/style';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
const { width, height } = Dimensions.get('window');

export default function SecondPage() {
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
    const inscribeOn = [
        {
            title: 'Random',
        },
        {
            title: 'Pizza',
        },
        {
            title: 'Block78',
        }
    ]
    const costAnalysis = [
        {
            title: 'Inscription Cost',
            sats: '33196sats',
            amount: "($0.15)"
        },
        {
            title: 'Sat Cost',
            sats: 'sats',
            amount: "($0.15)"
        },
        {
            title: 'Postage Fee',
            sats: '550sats',
            amount: "($0.15)"
        },
        {
            title: 'Service Charge',
            sats: '550sats',
            amount: "($0.15)"
        },
        {
            title: 'Size Fee',
            sats: '550sats',
            amount: "($0.15)"
        },
        {
            title: 'Total',
            sats: '5520sats',
            amount: "($0.15)"
        },
    ]
    const [selectedInscribeOn, setSelectedInscribeOn] = useState<number>(0)
    const [finalRate, setFinalRate] = useState("")
    const [selectedRate, setSelectedRate] = useState<number>(0)
    return (
        <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={{
                    marginBottom: 20,
                }}>
                    <Text style={[{
                        textAlign: "center", ...CoreStyles.text({
                            fontFamily: 'Sora_700Bold',
                            fontSize: dynamicFontSize(18),
                        }),
                    }]}>Inscribe</Text>
                    <Text style={[styles.headerText, { textAlign: "center", color: "rgba(163, 161, 161, 1)" }]}>Add files to inscribe</Text>
                    <Pressable style={{
                        borderColor: "#eedfff",
                        borderWidth: 2,
                        width: "100%",
                        padding: 10,
                        marginTop: 20,
                        height: 200,
                        gap: 10,
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <MaterialCommunityIcons name="file-upload" size={70} color="black" style={{ textAlign: "center" }} />
                        <Text style={[styles.balanceText, { textAlign: "center" }]}>click to select file</Text>
                    </Pressable>
                </View>
                <Text style={styles.headerText}>Receiving address</Text>
                <LinearGradient
                    colors={['rgba(197, 150, 255, 0.8)', 'rgba(255, 169, 150, 0.8)', 'rgba(255, 169, 150, 0.8)']}
                    start={{ x: 0.0, y: 1 }}
                    end={{ x: 1.0, y: 3.2 }}
                    style={[styles.linearGradient, { marginTop: 10 }]}>
                    <View style={styles.buttonContainer}>
                        <TextInput
                            placeholder="Address to receive inscription"
                            style={[styles.input, { marginTop: 0 }]}
                        />
                    </View>
                </LinearGradient>
                <View style={styles.contentContainer}>
                    <ScrollView horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={[styles.ratesContainer]}>
                        {inscribeOn.map((item, index) => (
                            <Pressable
                                onPress={() => {
                                    setSelectedInscribeOn(index)
                                }}
                                key={index} style={[styles.rateContainer,
                                {
                                    backgroundColor: "rgba(217, 217, 217, 0.15)",
                                    alignItems: "flex-start", justifyContent: "flex-start",
                                    padding: 10,
                                    borderColor: selectedInscribeOn == index ? "#c593f9" : "#d0d0d0",
                                    borderWidth: 1,
                                }
                                ]}>
                                <Text style={[styles.rateTitle, { textAlign: "left" }]}>
                                    {item.title}
                                </Text>
                                <Text style={[styles.subText, { textAlign: "left" }]}>
                                    Inscribe on
                                </Text>
                                <Text style={[styles.subText, { textAlign: "left" }]}>
                                    {item.title}
                                </Text>
                                <Pressable
                                    onPress={() => {
                                        setSelectedInscribeOn(index)
                                    }}
                                    style={{
                                        alignItems: "center",
                                        width: "100%",
                                        borderColor: selectedInscribeOn == index ? "#eedfff" : "#d0d0d0",
                                        borderWidth: 0.5,
                                        marginTop: 10,
                                        backgroundColor: selectedInscribeOn == index ? "#c593f9" : "transparent",
                                        padding: 5
                                    }}>
                                    <Text style={[styles.subText, {
                                        textAlign: "center",
                                        color: selectedInscribeOn == index ? "#000" : "rgba(163, 161, 161, 1)",
                                    }]}>
                                        {selectedInscribeOn == index ? "Selected" : "Select"}
                                    </Text>
                                </Pressable>
                            </Pressable>
                        ))}
                    </ScrollView>
                    <Text style={[styles.headerText, { marginVertical: 5, marginTop: 30 }]}>Fee Rate:</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.ratesContainer}>
                        {rates.map((rate, index) => (
                            <Pressable
                                onPress={() => {
                                    setSelectedRate(index)
                                    setFinalRate(rate.subtitle.split(" ")[0])
                                }}
                                key={index} style={[styles.rateContainer, {
                                    backgroundColor: selectedRate === index ? "#eedfff" : "rgba(217, 217, 217, 0.15)",
                                    borderColor: selectedRate === index ? "#eedfff" : "#d0d0d0",
                                    borderWidth: 1,
                                }]}>
                                <Text style={[styles.rateTitle, { color: "gray" }]}>{rate.title}</Text>
                                <Text style={[styles.rateTitle, { marginTop: 0 }]}>{rate.subtitle}</Text>
                                <Text style={styles.subText}>{rate.time}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                    {
                        selectedRate === rates.length - 1 &&
                        (
                            <View style={[styles.contentContainer, { height: 60, marginBottom: 30, marginTop: 5 }]}>
                                <TextInput
                                    placeholder="sat/vB"
                                    style={styles.input}
                                    onChangeText={(text) => {
                                        setFinalRate(text)
                                    }}
                                />
                            </View>
                        )
                    }
                </View>
                <View style={{
                    borderColor: "#eedfff",
                    borderWidth: 2,
                    width: "100%",
                    padding: 20,
                    paddingVertical: 30,
                    marginTop: 20,
                    // height: 200,
                    gap: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    {
                        costAnalysis.map((item, index) => {
                            return (
                                <View key={index} style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between", width: "100%",
                                    alignItems: "flex-end",
                                    position: "relative"
                                }}>
                                    <Text style={[styles.balanceText, { textAlign: "center", color: "#919090" }]}>{item.title}</Text>
                                    <View style={{
                                        flexDirection: "row", alignItems: "flex-end",
                                        justifyContent: "flex-start",
                                        gap: 5,
                                        width: "50%"
                                    }}>
                                        <Text style={[styles.rateTitle, { textAlign: "center" }]}>{item.sats}</Text>
                                        <Text style={[styles.subText, { textAlign: "center" }]}>{item.amount}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
                <LinearGradient
                    colors={['rgba(197, 150, 255, 0.8)', 'rgba(255, 169, 150, 0.8)']}
                    start={{ x: 0.0, y: 1 }}
                    end={{ x: 1.0, y: 3.2 }}
                    style={[styles.linearGradient, { marginTop: 30 }]}>
                    <Pressable onPress={() => {
                        router.push({
                            pathname: "/inscribe/3",
                            params: {
                                recipientAddress,
                                finalRate,
                                costAnalysis: JSON.stringify(costAnalysis),
                            }
                        })
                    }}>
                        <Text style={[{
                            textAlign: "center", color: "black", fontSize: 10, margin: 0, padding: 0, ...CoreStyles.text({
                                fontFamily: 'Sora_600SemiBold',
                                fontSize: dynamicFontSize(14),
                            }),
                        }]}>Make Payment</Text>
                    </Pressable>
                </LinearGradient>
            </View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 20,
        paddingTop: 50,
    },
    linearGradient: {
        height: 60,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 20,
    },
    buttonContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '99%',
        height: '95%',
        borderRadius: 3,
    },
    headerText: {
        ...CoreStyles.text({
            fontFamily: 'Sora_600SemiBold',
            fontSize: dynamicFontSize(14),
        }),
        textAlign: 'left',
        marginTop: 10
    },
    subText: {
        ...CoreStyles.text({
            fontFamily: 'Manrope_500Medium',
            fontSize: dynamicFontSize(12),
        }),
        textAlign: 'left',
        color: 'rgba(163, 161, 161, 1)',
    },
    contentContainer: {
        marginTop: 20,
    },
    balanceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    maxBalanceContainer: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'flex-end',
    },
    maxText: {
        ...CoreStyles.text({
            fontFamily: 'Manrope_400Regular',
            fontSize: dynamicFontSize(14),
        }),
    },
    balanceText: {
        ...CoreStyles.text({
            fontFamily: 'Sora_400Regular',
            fontSize: dynamicFontSize(14),
        }),
    },
    input: {
        textAlign: 'left',
        borderColor: 'rgba(217, 217, 217, 1)',
        borderWidth: 0.5,
        padding: 10,
        color: 'rgba(163, 161, 161, 1)',
        backgroundColor: 'rgba(217, 217, 217, 0.15)',
        marginTop: 10,
        width: "100%",
        height: "100%",
    },
    ratesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,

    },
    rateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(217, 217, 217, 1)',
        borderWidth: 0.5,
        padding: 5,
        width: width / 3.5,
    },
    rateTitle: {
        ...CoreStyles.text({
            fontFamily: 'Sora_600SemiBold',
            fontSize: dynamicFontSize(14),
        }),
        textAlign: 'center',
        marginTop: 5,
    },
    rateSubtitle: {
        ...CoreStyles.text({
            fontFamily: 'Manrope_400Regular',
            fontSize: dynamicFontSize(14),
        }),
        textAlign: 'center',
        marginTop: 5,
    },
    rateTime: {
        ...CoreStyles.text({
            fontFamily: 'Manrope_400Regular',
            fontSize: dynamicFontSize(14),
        }),
        textAlign: 'center',
        marginTop: 5,
    },
});

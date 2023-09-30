import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CoreStyles from '../../../src/core/index';
import { dynamicFontSize } from '../../../auth/style';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from "expo-router";
const { width, height } = Dimensions.get('window');
export default function Third() {
    const { recipientAddress, finalRate, costAnalysis } =
        useLocalSearchParams() as unknown as {
            recipientAddress: string;
            finalRate: string;
            costAnalysis: string;
        };
    const [costData, setCostData] = useState<{
        title: string;
        sats: string;
        amount: string;
    }[]>(JSON.parse(costAnalysis))
    return (
        <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={{
                    alignItems: "flex-start",
                    flexDirection: "column",
                    justifyContent: "center"
                }} >
                    <View style={{
                        alignItems: "flex-start",
                        justifyContent: "center",
                        borderColor: "#c293fd",
                        borderWidth: 0.5,
                        padding: 10,
                        backgroundColor: "rgba(217, 217, 217, 0.15)"
                    }}>
                        <Text style={[styles.headerText, { textAlign: "left", marginTop: 0 }]}
                        >SENDING BTC</Text>
                    </View>
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
                    {costData ?
                        costData.map((item, index) => {
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
                        }) : <Text>
                            No Data
                        </Text>
                    }
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center", width: "100%", marginTop: 20,
                    alignItems: "center",
                    gap: 10,
                    padding: 5,
                }}>
                    <Pressable
                        onPress={() => {
                            router.push("/dashboard/1")
                        }}
                        style={{
                            borderColor: "#eedfff",
                            borderWidth: 1,
                            width: "50%",
                            padding: 10
                        }}>
                        <Text style={{
                            textAlign: "center", margin: 0, padding: 0, ...CoreStyles.text({
                                fontFamily: 'Sora_600SemiBold',
                                fontSize: dynamicFontSize(14),
                                color: "#000"
                            }),
                        }}>
                            Reject
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            router.push("/inscribe/4")
                        }}
                        style={{
                            borderColor: "#eedfff",
                            borderWidth: 1,
                            width: "50%",
                            padding: 10,
                            backgroundColor: "#eedfff"

                        }}>
                        <Text style={{
                            textAlign: "center", margin: 0, padding: 0, ...CoreStyles.text({
                                fontFamily: 'Sora_600SemiBold',
                                fontSize: dynamicFontSize(14),
                                color: "#000"
                            }),
                        }}>
                            Confirm
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 20,
        paddingTop: 50,
        height: height
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

import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import CoreStyles from '../../../src/core/index';
import { dynamicFontSize } from '../../../auth/style';

export default function ThirdPage() {
    return (
        <ScrollView style={{ padding: 20, flex: 1, backgroundColor: "white" }}>
            <View style={styles.container}>
                <View style={{
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    width: "100%"
                }}>
                    <View style={{
                        backgroundColor: "#f0e0f1", paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderColor: 'rgba(217, 217, 217, 1)',
                        borderWidth: 1,
                    }}>
                        <Text>SENDING BTC</Text>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 5,
                        marginTop: 10
                    }}>
                        <Image source={require('../../../../assets/Bitcoin.png')} />
                        <Text>0.00475</Text>
                    </View>
                    <Text>$13.08</Text>
                </View>
                <View style={{ width: "100%", gap: 20, marginTop: 20 }}>
                    <View style={{
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        borderColor: "rgba(197, 150, 255, 0.8)",
                        borderWidth: 1,
                        padding: 10,
                        gap: 10,
                        borderRadius: 4,
                        backgroundColor: "rgba(217, 217, 217, 0.15)"
                    }}>
                        <Text>Input</Text>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <Text>Tx ID:</Text>
                            <Text>bcienbciniecicececbeucebcuebceb</Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <Text>Amount</Text>
                            <Text>0.00063862 BTC</Text>
                        </View>
                    </View>
                    {/* </LinearGradient> */}
                    <View style={{
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        borderColor: "rgba(197, 150, 255, 0.8)",
                        borderWidth: 1,
                        padding: 10,
                        gap: 10,
                        borderRadius: 4,
                        backgroundColor: "rgba(217, 217, 217, 0.15)"
                    }}>
                        <Text>Output</Text>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <Text>Address:</Text>
                            <Text>bcienbciniecicececbeucebcuebceb</Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <Text>Amount</Text>
                            <Text>0.000638622 BTC</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    width: "100%",
                    padding: 10,
                    marginTop: 30
                }}>
                    <View
                        style={{
                            borderColor: "#D9D9D9",
                            borderWidth: 0.5
                        }}
                    ></View>
                </View>
                <View
                    style={{
                        width: "100%"
                    }}
                >
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{
                                color: "black", ...CoreStyles.text({
                                    fontFamily: 'Sora_600SemiBold',
                                })
                            }}>Fee{" "}</Text>
                            <Text style={{
                                textAlign: "center", margin: 0, padding: 0, ...CoreStyles.text({
                                    fontFamily: 'Sora_400Regular',
                                    fontSize: dynamicFontSize(10),
                                    color: "#A3A1A1"
                                }),
                            }}
                            >(estimated)
                            </Text>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <Text style={{
                                textAlign: "center", margin: 0, padding: 0, ...CoreStyles.text({
                                    fontFamily: 'Sora_400Regular',
                                    fontSize: dynamicFontSize(10),
                                }),
                            }}
                            >$0.40</Text>
                            <Text style={{
                                textAlign: "center", margin: 0, padding: 0, ...CoreStyles.text({
                                    fontFamily: 'Sora_600SemiBold',
                                    fontSize: dynamicFontSize(12),
                                }),
                            }}
                            >3,000 sats</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            flexWrap: "wrap",
                            gap: 10,
                            marginTop: 10
                        }}
                    >
                        <Text
                            numberOfLines={2}
                            style={{
                                width: "50%",
                                margin: 0, padding: 0, ...CoreStyles.text({
                                    fontFamily: 'Sora_400Regular',
                                    fontSize: dynamicFontSize(11),
                                    color: "rgba(25, 159, 89, 0.80)"
                                }),
                            }}
                        >
                            Estimated Time {"<"} 60 seconds
                        </Text>
                        <View style={{ flexDirection: "row", width: "auto", alignItems: "center" }}>
                            <Text
                                numberOfLines={2}
                                style={{
                                    textAlign: "right",
                                    margin: 0, padding: 0, ...CoreStyles.text({
                                        fontFamily: 'Sora_600SemiBold',
                                        fontSize: dynamicFontSize(10),
                                        color: "#A3A1A1"
                                    }),
                                }}
                            >
                                Max fee: {" "}
                            </Text>
                            <Text
                                numberOfLines={2}
                                style={{
                                    textAlign: "right",
                                    margin: 0, padding: 0, ...CoreStyles.text({
                                        fontFamily: 'Sora_400Regular',
                                        fontSize: dynamicFontSize(10),
                                        color: "#A3A1A1"
                                    }),
                                }}
                            >
                                0.00063 BTC
                            </Text>
                        </View>
                    </View>

                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between", width: "100%", marginTop: 20,
                    alignItems: "center",
                    gap: 10
                }}>
                    <Pressable
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
                    <Pressable style={{
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
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    linearGradient: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
})
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CoreStyles from '../../../src/core/index';
import { dynamicFontSize } from '../../../auth/style';
import { MaterialIcons } from '@expo/vector-icons';
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
    const [finalRate, setFinalRate] = useState("")
    const [selectedRate, setSelectedRate] = useState<number>(0)
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.headerText}>Recipient account</Text>
            <LinearGradient
                colors={['rgba(197, 150, 255, 0.8)', 'rgba(255, 169, 150, 0.8)', 'rgba(255, 169, 150, 0.8)']}
                start={{ x: 0.0, y: 1 }}
                end={{ x: 1.0, y: 3.2 }}
                style={styles.linearGradient}>
                <View style={styles.buttonContainer}>
                    <TextInput
                        placeholder="Enter recipient address"
                        style={[styles.input, { marginTop: 0 }]}
                    />
                </View>
            </LinearGradient>
            <View style={styles.contentContainer}>
                <View style={styles.balanceContainer}>
                    <Text style={styles.headerText}>Balance</Text>
                    <View style={styles.maxBalanceContainer}>
                        <Text style={styles.maxText}>MAX</Text>
                        <Text style={styles.balanceText}>0.000549 BTC</Text>
                    </View>
                </View>
                <View style={[styles.contentContainer, { height: 60, marginBottom: 30, marginTop: -5 }]}>
                    <TextInput
                        placeholder="Amount to be sent"
                        style={styles.input}
                    />
                </View>
                <Text style={[styles.headerText, { marginVertical: 5 }]}>Fee Rate:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.ratesContainer}>
                    {rates.map((rate, index) => (
                        <Pressable
                            onPress={() => {
                                setSelectedRate(index)
                                setFinalRate(rate.subtitle.split(" ")[0])
                            }}
                            key={index} style={[styles.rateContainer, { backgroundColor: selectedRate === index ? "#f0e0f1" : "#e5e7ed" }]}>
                            <Text style={styles.rateTitle}>{rate.title}</Text>
                            <Text style={styles.rateSubtitle}>{rate.subtitle}</Text>
                            <Text style={styles.rateTime}>{rate.time}</Text>
                        </Pressable>
                    ))}
                </ScrollView>
                <View style={[styles.contentContainer, { height: 60, marginBottom: 30, marginTop: 5 }]}>
                    <TextInput
                        placeholder="sat/vB"
                        style={styles.input}
                        onChangeText={(text) => {
                            setFinalRate(text)
                        }}
                    />
                </View>
            </View>
            <LinearGradient
                colors={['rgba(197, 150, 255, 0.8)', 'rgba(255, 169, 150, 0.8)']}
                start={{ x: 0.0, y: 1 }}
                end={{ x: 1.0, y: 3.2 }}
                style={[styles.linearGradient, { marginTop: 30 }]}>
                <Pressable onPress={() => {
                    router.push("/send/3")
                }}>
                    <Text style={[{
                        textAlign: "center", color: "black", fontSize: 10, margin: 0, padding: 0, ...CoreStyles.text({
                            fontFamily: 'Sora_600SemiBold',
                            fontSize: dynamicFontSize(14),
                        }),
                    }]}>Next</Text>
                </Pressable>
            </LinearGradient>

        </ScrollView>
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
            fontFamily: 'Manrope_400Regular',
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

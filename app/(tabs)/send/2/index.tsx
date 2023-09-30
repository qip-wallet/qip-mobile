import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CoreStyles from '../../../src/core/index';
import { dynamicFontSize } from '../../../auth/style';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

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
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <LinearGradient
                colors={['rgba(197, 150, 255, 0.8)', 'rgba(255, 169, 150, 0.8)', 'rgba(255, 169, 150, 0.8)']}
                start={{ x: 0.0, y: 1 }}
                end={{ x: 1.0, y: 3.2 }}
                style={styles.linearGradient}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.headerText}>Recipient account</Text>
                    <Text style={styles.subText}>{recipientAddress}</Text>
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
                <TextInput
                    placeholder="Amount to be sent"
                    style={styles.input}
                />
                <Text style={styles.headerText}>Fee Rate:</Text>
                <ScrollView horizontal contentContainerStyle={styles.ratesContainer}>
                    {rates.map((rate, index) => (
                        <View key={index} style={styles.rateContainer}>
                            <Text style={styles.rateTitle}>{rate.title}</Text>
                            <Text style={styles.rateSubtitle}>{rate.subtitle}</Text>
                            <Text style={styles.rateTime}>{rate.time}</Text>
                        </View>
                    ))}
                </ScrollView>
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
        padding: 15,
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

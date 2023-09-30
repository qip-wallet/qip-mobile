import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CoreStyles from '../../../src/core/index';
import { dynamicFontSize } from '../../../auth/style';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from "expo-router";
const { width, height } = Dimensions.get('window');
export default function Third() {
    return (
        <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={[{
                    marginTop: height * 0.2, ...CoreStyles.text({
                        fontFamily: 'Sora_600SemiBold',
                        fontSize: dynamicFontSize(32),
                        color: "#828181"
                    }),
                }]}>
                    15:00:00
                </Text>
                <Text style={[{
                    ...CoreStyles.text({
                        fontFamily: 'Sora_600SemiBold',
                        fontSize: dynamicFontSize(16),
                        color: "#828181"
                    }),
                }]}>
                    Sending Inscription
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        height
    },
});

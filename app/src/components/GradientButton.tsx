import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
type LinearGradientButtonProps = {
    children: React.ReactNode;
    onPress?: () => void;
    style?: any;
    colors?: string[]
};
// #C596FF, #E6A1C2, #FFA996
export default function LinearGradientButton({
    children,
    style,
    colors = ['#C596FF', '#E6A1C2', '#FFA996']
}: LinearGradientButtonProps) {
    return (
        <>
            <LinearGradient
                // Button Linear Gradient
                colors={colors}
                // 125 degrees
                start={{ x: 0.1, y: 0.5 }}
                end={{ x: 1, y: 1 }}
                locations={[0, 0.7, 1]}
                // rotate
                style={
                    [style]
                }
            >
                {children && typeof children === 'string' ? (
                    <Text style={styles.text}>{children}</Text>
                ) : (
                    children
                )}
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    text: {
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#000',
    },
});

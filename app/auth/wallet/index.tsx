import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import Styles from '../style'
import CoreStyles from '../../src/core/index';
import { dynamicFontSize } from '../style';
import LinearGradientButton from '../../src/components/GradientButton';
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');
import { appRoutes } from '../../src/utils/routes';
const Wallet = () => {
    return (
        <View style={Styles.container}>
            <Text style={[CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(28) }), { textAlign: "center" }]}>The only Bitcoin wallet you would ever need</Text>
            <View style={[CoreStyles.space({ height: dynamicFontSize(10) }), { backgroundColor: 'transparent' }]} />
            <Text style={[CoreStyles.text({ color: "#A3A1A1", fontFamily: "Manrope_600SemiBold", fontSize: dynamicFontSize(14) }), { textAlign: "center" }]}>This is your access to your wallet</Text>
            <View style={[CoreStyles.space({ height: 30 }), { backgroundColor: 'transparent' }]} />
            <LinearGradientButton onPress={() => null} style={Styles.button}>
                <Link href={appRoutes.auth.confirmPassphrase}>
                    <Text style={{ fontFamily: "Sora_600SemiBold", fontWeight: '600', fontSize: dynamicFontSize(16) }}>Create new wallet</Text>
                </Link>
            </LinearGradientButton>
            <View style={[CoreStyles.space({ height: 10 }), { backgroundColor: 'transparent' }]} />
            <TouchableOpacity style={[Styles.button, { backgroundColor: "#D9D9D94D", width: width - 40, height: 50 }]}>
                <Link href={appRoutes.auth.confirmPassphrase}>
                    <Text style={{ fontFamily: "Sora_600SemiBold", fontWeight: '600', fontSize: dynamicFontSize(16) }}>Create new wallet</Text>
                </Link>
            </TouchableOpacity>
        </View>
    )
}

export default Wallet
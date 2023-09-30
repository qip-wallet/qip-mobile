import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Clipboard, Vibration } from 'react-native'
import React from 'react'
import CoreStyles from '../../src/core/index';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { dynamicFontSize } from '../../auth/style';
import { useUserData } from '../../context/index';
const { width, height } = Dimensions.get("window");

const ReceivePage = () => {
    const { activeAccount, activeAccountAddress } = useUserData();

    return (
        <View style={styles.container}>
            <Text
                style={[
                    CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(14) }),
                    {
                        textAlign: 'center',
                    },
                ]}
            >
                {activeAccount.name}
            </Text>
            <Text>
                QR code goes here
            </Text>
            <View style={{ backgroundColor: "#ebecfe", paddingHorizontal: 10, borderRadius: 0, paddingVertical: 5 }}>
                <TouchableOpacity onPress={() => {
                    Vibration.vibrate(10)
                    Clipboard.setString(activeAccountAddress.address)
                }} style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    padding: 8, width: "auto",
                    justifyContent: "center",
                    paddingHorizontal: 30
                }}>
                    <Text ellipsizeMode='middle' numberOfLines={1} style={[CoreStyles.text({ color: "black", fontFamily: "Manrope_400Regular", fontSize: dynamicFontSize(14) }), { textAlign: "center" }]}>
                        {activeAccountAddress.address}
                    </Text>
                    <MaterialCommunityIcons name="content-copy" size={15} color="gray" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ReceivePage

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        gap: 30
    }
})
import { View, Text, TextInput, Dimensions, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import CoreStyles from '../../../src/core/index'
import { dynamicFontSize } from '../../../auth/style';
import { MaterialIcons } from '@expo/vector-icons';
const { width, height } = Dimensions.get("window");
import { LinearGradientComponent } from '../../dashboard/1';
import { router } from 'expo-router';
export default function FirstPage() {
    const [recipientAddress, setRecipientAddress] = useState<string>("")
    return (
        <View style={{ backgroundColor: "white", width, height, padding: 20 }}>
            <View style={{
                borderColor: "rgba(217, 217, 217, 1)",
                borderWidth: 1,
                backgroundColor: "rgba(217, 217, 217, 0.15)",
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-between", alignItems: "center",
                marginVertical: 20
            }}>
                <TextInput
                    onChangeText={(text) => setRecipientAddress(text)}
                    value={recipientAddress}
                    placeholder="Enter public address of sat name" />
                <MaterialIcons name='qr-code-scanner' size={28} />
            </View>
            <Text
                style={[
                    CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(12) }),
                    { textAlign: 'left', marginBottom: 50 },
                ]}
            >
                Saved Beneficiaries
            </Text>
            <LinearGradientComponent style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                paddingVertical: 15,
                justifyContent: "center",
            }}
                fullWidth
                fullHeight
                onPress={() => {
                    router.push({
                        pathname: "/send/2",
                        params: {
                            recipientAddress
                        }
                    })
                }}
            >
                <Text
                    style={[
                        CoreStyles.text({
                            fontFamily: 'Sora_600SemiBold', fontSize: dynamicFontSize(14)
                        }),
                        { textAlign: 'left' },
                    ]}
                >Next</Text>
            </LinearGradientComponent>
        </View>
    )
}


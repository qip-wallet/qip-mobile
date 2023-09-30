import { View, Text, KeyboardAvoidingView, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router'
import { dynamicFontSize } from '../../../auth/style'
import { LinearGradientComponent } from '../1'
import CoreStyles from '../../../src/core/index';
import { useUserData } from '../../../context/index';

const SettingsPage = () => {
    const { activeWallet, activeAccountAddress } = useUserData();

    const list = [
        {
            title: "Address Type",
            subtitle: activeAccountAddress.type,
            path: "/settings/address"
        },
        {
            title: "Advanced",
            subtitle: "Check advanced information about your wallet",
            path: "/settings/advanced"
        },
        {
            title: "Network Type",
            subtitle: activeWallet?.activeNetworkName?.toUpperCase(),
            path: "/settings/network"
        },
        {
            title: "Update Password",
            subtitle: "Update your lockscreen password",
            path: "/settings/password"
        }
    ]
    return (
        <View
            style={{ padding: 5, flex: 1, width: "100%", height: "100%" }
            }>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}>
                <View style={{ marginTop: 20, width: "100%", padding: 20, gap: 10 }}>
                    {
                        list.map((item, index) => {
                            return (

                                <LinearGradientComponent
                                    fullWidth
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        padding: 20,
                                        paddingVertical: 20,
                                        gap: 10,
                                    }}
                                    key={index}
                                    onPress={async () => {
                                        router.push(item.path)
                                    }}
                                    colors={["rgba(197, 150, 255, 0.2)", "rgba(230, 161, 194, 0.2)", "rgba(255, 169, 150, 0.2)"]}
                                >
                                    <View style={{ gap: 5 }}>
                                        <Text
                                            style={[
                                                CoreStyles.text({
                                                    fontFamily: 'Sora_600SemiBold', fontSize: dynamicFontSize(14)
                                                }),
                                                { textAlign: 'left' },
                                            ]}
                                        >{item.title}</Text>
                                        <Text
                                            style={[
                                                CoreStyles.text({
                                                    fontFamily: 'Manrope_500Medium', fontSize: dynamicFontSize(12)
                                                }),
                                                { textAlign: 'left', color: "rgba(163, 161, 161, 0.67)" },
                                            ]}
                                        >{item.subtitle}</Text>
                                    </View>
                                </LinearGradientComponent>
                            )
                        })
                    }
                </View>
            </ScrollView >
        </View >
    )
}

export default SettingsPage
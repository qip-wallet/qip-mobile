import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Clipboard, Vibration, Pressable } from 'react-native'
import React, { useState } from 'react'
import CoreStyles from '../../../src/core/index';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { dynamicFontSize } from '../../../auth/style';
import { useUserData } from '../../../context/index';
import { LinearGradientComponent } from '../../dashboard/1';
import { router } from 'expo-router';
const Inscribe = () => {
    const routes = [
        {
            title: "Upload my file",
            route: "/inscribe/2"
        },
        {
            title: "Inscribe with AI",
            route: "/inscribe/ai"
        },
    ]
    const [nextRoute, setNextRoute] = useState("/inscribe/2")
    return (
        <View style={styles.container}>
            <Text
                style={[
                    CoreStyles.text({
                        fontFamily: 'Sora_700Bold',
                        fontSize: dynamicFontSize(16)
                    }),
                    {
                        textAlign: 'center',
                        marginTop: 40
                    },
                ]}
            >
                Inscribe
            </Text>
            <Text
                style={[
                    CoreStyles.text({
                        fontFamily: 'Manrope_600SemiBold',
                        fontSize: dynamicFontSize(14),
                        color: "#A3A1A1"
                    }),
                    {
                        textAlign: 'center',
                        marginTop: 5
                    },
                ]}
            >
                Inscribe your image, photos, files, etc. here
            </Text>

            <View style={{
                flexDirection: "row",
                justifyContent: "space-between", width: "100%", marginTop: 20,
                alignItems: "center",
                gap: 10
            }}>
                {
                    routes.map((route, index) => {
                        return (
                            <Pressable
                                key={index}
                                onPress={() => {
                                    setNextRoute(route.route)
                                }}
                                style={{
                                    borderColor: "#eedfff",
                                    borderWidth: 1,
                                    width: "48%",
                                    padding: 10,
                                    backgroundColor: nextRoute === route.route ? "#eedfff" : "white"
                                }}>
                                <Text style={{
                                    textAlign: "center", margin: 0, padding: 0, ...CoreStyles.text({
                                        fontFamily: 'Sora_600SemiBold',
                                        fontSize: dynamicFontSize(14),
                                        color: "#000"
                                    }),
                                }}>
                                    {route.title}
                                </Text>
                            </Pressable>
                        )
                    })
                }
            </View>
            <LinearGradientComponent
                fullWidth
                style={{
                    padding: 10,
                    marginTop: 20,
                    paddingVertical: 15,
                    borderRadius: 3,
                }} onPress={() => {
                    router.push(nextRoute)
                }}>
                <Text style={{
                    textAlign: "center", margin: 0, padding: 0, ...CoreStyles.text({
                        fontFamily: 'Sora_600SemiBold',
                        fontSize: dynamicFontSize(16),
                        color: "#000"
                    }),
                }}>
                    Next
                </Text>
            </LinearGradientComponent>
        </View >
    )
}

export default Inscribe

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        padding: 20
    }
})
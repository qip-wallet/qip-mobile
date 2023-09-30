import { Text, TextInput, Platform, View, StyleSheet, Pressable, Clipboard, DimensionValue, StyleProp, ViewStyle, Dimensions, FlatList, VirtualizedList, TouchableOpacity, Vibration } from 'react-native';
import React, { useState, useEffect } from 'react'
import { Link, Stack, useRouter, useLocalSearchParams, router } from 'expo-router'
import CoreStyles from '../../../src/core/index';
import { dynamicFontSize } from '../../../auth/style';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ActivitiesList from '../../../../components/1/activity';
import InscriptionList from '../../../../components/1/inscription';
import Brc20List from '../../../../components/1/brc-20';
import { useUserData } from '../../../context/index';
const { width, height } = Dimensions.get("window");
const WalletPage = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const [routes, setRoutes] = useState([
        {
            name: "Activity",
            component: <ActivitiesList />
        },
        {
            name: "Inscriptions",
            component: <InscriptionList />
        },
        {
            name: "BRC-20",
            component: <Brc20List />
        }

    ])

    const { user, activeWallet, activeAccount, activeAccountAddress } = useUserData();
    return (
        <View style={{ padding: 20, flex: 1, justifyContent: "flex-start", alignItems: "center", width: "100%", backgroundColor: "white", display: user && activeWallet && activeAccount ? "flex" : "none" }
        }>
            <View style={{ backgroundColor: "#ebecfe", paddingHorizontal: 10, borderRadius: 0, paddingVertical: 5 }}>
                <TouchableOpacity onPress={() => {
                    Vibration.vibrate(10)
                    Clipboard.setString(activeAccountAddress.address)
                }} style={{
                    flexDirection: "row", alignItems: "center",
                    gap: 5, maxWidth: width * 0.5, padding: 8, width: "auto",
                    justifyContent: "center",
                    paddingHorizontal: 30
                }}>
                    <Text ellipsizeMode='middle' numberOfLines={1} style={[CoreStyles.text({ color: "black", fontFamily: "Manrope_400Regular", fontSize: dynamicFontSize(14) }), { textAlign: "center" }]}>
                        {activeAccountAddress.address}
                    </Text>
                    <MaterialCommunityIcons name="content-copy" size={15} color="gray" />
                </TouchableOpacity>
            </View>
            <Text
                style={[CoreStyles.text({ fontFamily: 'Sora_600SemiBold', fontSize: dynamicFontSize(30) }),
                {
                    textAlign: "center"
                }
                ]}>
                0.000263 BTC
            </Text>
            <Text
                style={[CoreStyles.text({ fontFamily: 'Manrope_500Medium', fontSize: dynamicFontSize(16) }),
                {
                    textAlign: "center"
                }
                ]}>
                $6.99 USD
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: "100%", marginTop: 20 }}>
                <Pressable style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <LinearGradientComponent onPress={() => {
                        router.push("/send/1")
                    }} style={{ borderRadius: 100, padding: 5 }}>
                        <MaterialCommunityIcons name='send' style={{ transform: [{ rotate: "-25deg" }], padding: 10 }} size={24} />
                    </LinearGradientComponent>
                    <Text style={[CoreStyles.text({ fontFamily: 'Manrope_500Medium', fontSize: dynamicFontSize(14) }), { textAlign: "center" }]}>Send</Text>
                </Pressable>
                <Pressable style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <LinearGradientComponent onPress={() => {
                        router.push("/receive")
                    }} style={{ borderRadius: 100, padding: 5 }}>
                        <MaterialCommunityIcons name='email-receive' style={{ padding: 10 }} size={24} />
                    </LinearGradientComponent>
                    <Text style={[CoreStyles.text({ fontFamily: 'Manrope_500Medium', fontSize: dynamicFontSize(14) }), { textAlign: "center" }]}>Receive</Text>
                </Pressable>
                <Pressable style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <LinearGradientComponent style={{ borderRadius: 100, padding: 5 }}>
                        <MaterialCommunityIcons name='email-receive' style={{ padding: 10 }} size={24} />
                    </LinearGradientComponent>
                    <Text style={[CoreStyles.text({ fontFamily: 'Manrope_500Medium', fontSize: dynamicFontSize(14) }), { textAlign: "center" }]}>Inscribe</Text>
                </Pressable>
                <Pressable style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <View style={{ backgroundColor: "rgba(217, 217, 217, 1)", borderRadius: 100, padding: 5 }}>
                        <MaterialCommunityIcons name='plus' color="rgba(163, 161, 161, 1)" style={{ padding: 10 }} size={24} />
                    </View>
                    <Text style={[CoreStyles.text({ fontFamily: 'Manrope_500Medium', fontSize: dynamicFontSize(14) }), { textAlign: "center" }]}>Buy</Text>
                </Pressable>
            </View>
            <View style={{ width: "100%", flexDirection: "row", gap: 20, marginVertical: 10, marginTop: 40 }}>
                {
                    routes.map((item, index) => {
                        return (
                            <Pressable style={{
                                borderBottomColor: activeTabIndex === index ? "rgba(197, 150, 255, 1)" : "transparent",
                                borderBottomWidth: activeTabIndex === index ? 1 : 0,
                                paddingBottom: 5,
                                paddingHorizontal: 10,
                            }} key={index} onPress={() => setActiveTabIndex(index)}>
                                <Text style={[CoreStyles.text({
                                    fontFamily: 'Manrope_600SemiBold', fontSize: dynamicFontSize(16), color: activeTabIndex === index ? "rgba(197, 150, 255, 1)" : "black"
                                }),
                                { textAlign: "center" }]}>{item.name}</Text>
                            </Pressable>
                        )
                    }
                    )
                }
            </View>
            {
                <View style={{
                    width: width,
                    height: height / 2,
                    paddingHorizontal: 10,
                    // backgroundColor: activeTabIndex !== 1 ? "rgba(243, 249, 255, 0.5)" : "transparent",
                    marginTop: 10,
                    paddingBottom: 30,
                }}>
                    {routes[activeTabIndex].component}
                </View>
            }
        </View >
    )
}

type LinearGradientButtonProps = {
    children: React.ReactNode;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    colors?: string[],
    width?: DimensionValue | number,
    height?: DimensionValue | number,
    fullWidth?: boolean,
    fullHeight?: boolean,
};
// #C596FF, #E6A1C2, #FFA996
function LinearGradientComponent({
    children,
    style,
    colors = ['rgba(197, 150, 255, 0.7)', 'rgba(230, 161, 194, 0.7)', 'rgba(255, 169, 150, 0.7)'],
    onPress,
    width,
    height,
    fullWidth = false,
    fullHeight = false
}: LinearGradientButtonProps) {
    return (
        <Pressable onPress={onPress} style={
            [{ height, width, flexDirection: "row", alignItems: "center", justifyContent: "center" }]
        }>
            <LinearGradient
                colors={colors}
                start={{ x: 0.1, y: 0.5 }}
                end={{ x: 1, y: 1 }}
                locations={[0, 0.7, 1]}
                style={[style, { width: fullWidth ? "100%" : "auto", height: fullHeight ? "100%" : "auto" }]}
            >
                {children && typeof children === 'string' ? (
                    <Text style={styles.text}>{children}</Text>
                ) : (
                    children
                )}
            </LinearGradient>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    text: {
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#000',
    },
});

export {
    LinearGradientComponent
}

export default WalletPage
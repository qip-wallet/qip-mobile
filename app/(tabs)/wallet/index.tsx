import { View, Text, Pressable, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dynamicFontSize } from '../../auth/style';
import CoreStyles from '../../src/core/index';
import { useUserData } from '../../context/index';
import { LinearGradientComponent } from '../dashboard/1';
import { updateUser, updateWallet } from '../../realm'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Modal() {
    const { activeWallet, activeUserWallets } = useUserData();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="auto" />
            <View style={{ alignItems: 'center', justifyContent: 'center', width: "100%", height: "100%" }}>
                <View style={{
                    position: "relative", width: "100%",
                    alignItems: "center", flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 10
                }}>
                    <View style={{ flexGrow: 1 }}>
                        <Text
                            style={[
                                CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(16) }),
                                {
                                    textAlign: 'center',
                                },
                            ]}
                        >
                            Change Wallets
                        </Text>
                    </View>
                    <View style={{
                        position: "relative", right: 20, borderRadius: 100,
                        zIndex: 100,
                        opacity: 1,
                        width: 30,
                        height: 30,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <LinearGradientComponent
                            style={{
                                borderRadius: 100,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            fullHeight
                            fullWidth
                            onPress={() => {
                                router.push("/wallet/new/action")
                            }}
                        >
                            <MaterialCommunityIcons name="plus" size={24} color="white" />
                        </LinearGradientComponent>
                    </View>

                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}>
                    <View style={{ marginTop: 20, width: "100%", padding: 20, gap: 10 }}>

                        {
                            activeUserWallets.map((wallet, index) => {
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
                                            updateUser({ activeWalletId: wallet._id })
                                            router.replace("/dashboard")
                                        }}
                                        colors={["rgba(197, 150, 255, 0.2)", "rgba(230, 161, 194, 0.2)", "rgba(255, 169, 150, 0.2)"]}
                                    >
                                        <View
                                            style={{
                                                height: 15, width: 15,
                                                backgroundColor: activeWallet._id?.equals(wallet._id) ? "#C596FF" : "transparent",
                                                borderColor: activeWallet._id?.equals(wallet._id) ? "#C596FF" : "gray",
                                                borderWidth: 1,
                                                borderRadius: 10, marginRight: 10
                                            }}></View>
                                        <View style={{ gap: 5 }}>
                                            <Text
                                                style={[
                                                    CoreStyles.text({
                                                        fontFamily: 'Sora_600SemiBold', fontSize: dynamicFontSize(14)
                                                    }),
                                                    { textAlign: 'left' },
                                                ]}
                                            >#{wallet.name}</Text>
                                        </View>
                                    </LinearGradientComponent>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView >
    );
}

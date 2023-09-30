import { View, Text, Pressable, ScrollView } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dynamicFontSize } from '../../auth/style';
import CoreStyles from '../../src/core/index';
import { useUserData } from '../../context/index';
import { LinearGradientComponent } from '../dashboard/1';
import { findAddressesByParentAccountId, updateWallet, IAddressSchema, IAccountSchema, getAccountActiveAddress } from '../../realm'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ObjectId } from 'bson';
export default function Modal() {
    const { activeWallet, activeWalletAccounts } = useUserData();

    const [addresses, setAddresses] = useState<
        {
            account: IAccountSchema;
            address: string;
        }[]
    >([]);

    useEffect(() => {
        const filteredAccounts = activeWalletAccounts.filter((account) => account.networkName === activeWallet.activeNetworkName);
        // Fetch addresses for all accounts asynchronously
        const fetchAddresses = async () => {
            const addressPromises = filteredAccounts.map(async (account) => {
                const address = await getAccountActiveAddress(new ObjectId(account._id));
                return {
                    account,
                    address: address.address, // Extract the address string from the IAddressSchema object
                };
            });

            // Wait for all promises to resolve and update state
            const resolvedAddresses = await Promise.all(addressPromises);
            setAddresses(resolvedAddresses);
        };

        fetchAddresses();
    }, [activeWalletAccounts]);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="auto" />
            <View style={{ alignItems: 'center', justifyContent: 'center', width: "100%", height: "100%" }}>
                <View style={{
                    position: "relative", width: "100%",
                    alignItems: "center", flexDirection: "row",
                    justifyContent: "space-between"
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
                            Change Account
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
                                console.log("clicking")
                                router.push("/account/new/name")
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
                            addresses.map((data, index) => {
                                return (
                                    <LinearGradientComponent
                                        fullWidth
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            padding: 20,
                                            paddingVertical: 10,
                                            gap: 10
                                        }}
                                        key={index}
                                        onPress={async () => {
                                            updateWallet(activeWallet._id, { activeAccountId: data.account._id })
                                            router.replace("/dashboard/1")
                                        }}
                                        colors={["rgba(197, 150, 255, 0.2)", "rgba(230, 161, 194, 0.2)", "rgba(255, 169, 150, 0.2)"]}
                                    >
                                        <View
                                            style={{
                                                height: 15, width: 15,
                                                backgroundColor: activeWallet.activeAccountId?.equals(data.account._id) ? "#C596FF" : "transparent",
                                                borderColor: activeWallet.activeAccountId?.equals(data.account._id) ? "#C596FF" : "gray",
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
                                            >{data.account.name}</Text>
                                            <Text
                                                ellipsizeMode='middle' numberOfLines={1}
                                                style={[
                                                    CoreStyles.text({
                                                        fontFamily: 'Manrope_400Regular',
                                                        fontSize: dynamicFontSize(14),
                                                        color: "gray"
                                                    }),
                                                    { width: "50%" }
                                                ]}
                                            >
                                                {
                                                    data.address
                                                }
                                            </Text>
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

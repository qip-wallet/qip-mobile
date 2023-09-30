import { View, Text, Pressable, TextInput, Dimensions, FlatList, TouchableOpacity, Clipboard } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles, { dynamicFontSize } from '../../../../auth/style';
import CoreStyles from '../../../../src/core/index';
import { useUserData } from '../../../../context/index';
import { networkNameTypes, updateWallet } from '../../../../realm'
import React, { useContext, useEffect, useState } from 'react';
import { LinearGradientComponent } from '../../../dashboard/1';
import { AccountCreationContext, AccountData } from '../../../../context/data';
import { ObjectId } from 'bson';
const { width, height } = Dimensions.get("window");
const EnterAccountName = () => {
    const { user, activeWallet, activeAccount, activeWalletAccounts } = useUserData();
    const context = useContext(AccountCreationContext);
    if (!context) {
        return null;
    }
    const [accountName, setAccountName] = useState("")
    const { networkName } = useLocalSearchParams()
    return (
        <View style={{
            alignItems: 'center', justifyContent: 'center',
            padding: 10,
            width: "100%",
        }}>
            <Text
                style={[
                    CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(16) }),
                    {
                        textAlign: 'center',
                    },
                ]}
            >
                New Account
            </Text>
            <TextInput
                onChangeText={(text) => {
                    setAccountName(text);
                }}
                placeholder="Account Name (optional)" style={{
                    width: "100%", padding: 20, borderRadius: 0, backgroundColor: "rgba(217, 217, 217, 0.15)",
                    borderColor: "rgba(217, 217, 217, 1)", borderWidth: 1,
                    marginTop: 20
                }} />
            <View style={{
                width: "100%",
                marginTop: 30,
                height: 70
            }}>
                <LinearGradientComponent style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 20,
                    paddingVertical: 20,
                    gap: 10,
                    justifyContent: "center"
                }}
                    fullWidth
                    fullHeight
                    colors={["rgba(197, 150, 255, 0.5)", "rgba(230, 161, 194, 0.5)", "rgba(255, 169, 150, 0.5)"]}
                >
                    <Link
                        href={{
                            pathname: "/account/new/address",
                            params: {
                                accountName,
                                networkName: networkName ? networkName : activeWallet.activeNetworkName as networkNameTypes
                            }
                        }}
                        style={[
                            CoreStyles.text({
                                fontFamily: 'Sora_600SemiBold', fontSize: dynamicFontSize(14)
                            }),
                            { textAlign: 'center' },
                        ]}
                    >
                        Next
                    </Link>
                </LinearGradientComponent>
            </View>
        </View>
    )
}

export default EnterAccountName;
import { View, Text, KeyboardAvoidingView, TextInput, ScrollView, Alert } from 'react-native'
import React, { useEffect, useCallback, useState, memo } from 'react'
import { Stack, router, Navigator } from 'expo-router'
import { dynamicFontSize } from '../../../auth/style'
import { LinearGradientComponent } from '../../dashboard/1'
import CoreStyles from '../../../src/core/index';
import { useUserData } from '../../../context/index';
import { networkNameTypes, updateAccount, updateWallet, switchNetwork, getActiveWalletAccounts } from '../../../realm';
import { BSON } from 'realm'
const ChangeNetworkTypePage = () => {
  const { activeWallet, activeAccountAddress, activeAddresses } = useUserData();
  const networkType = [
    {
      name: "testnet",
    },
    {
      name: "mainnet",
    },
  ] as { name: networkNameTypes }[]
  const [activeNetwork, setActiveNetwork] = useState<networkNameTypes>(activeWallet.activeNetworkName)
  const checkIfAccountsWithSelectedNetwork = async (networkName: networkNameTypes) => {
    try {
      const accounts = await getActiveWalletAccounts()
      const data = accounts.filter((account) => account.networkName === networkName)
      return data
    } catch (error) {
      console.error("an error occurred while checking is network name selected exists in accounts list", error)
    }
  }
  const ConfirmModal = (network: networkNameTypes) =>
    Alert.alert('Confirm', 'Selected network does not exist in your accounts list. Do you want to create a new account with this network?', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('Cancel Pressed')
        },
        style: 'cancel',
      },
      {
        text: 'OK', onPress: () => {
          console.log("i selected the network of ", network)
          router.push({
            pathname: "/account/new/name",
            params: {
              networkName: network
            }
          })
        }
      },
    ])

  return (
    <View
      style={{ padding: 5, flex: 1, width: "100%", height: "100%" }
      }>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}>
        <View style={{ marginTop: 20, width: "100%", padding: 20, gap: 10 }}>
          {
            networkType.map((network, index) => {
              const isActive = activeWallet.activeNetworkName === network.name
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
                  onPress={
                    async () => {
                      setActiveNetwork(network.name)
                      const checkNetworkExists = await checkIfAccountsWithSelectedNetwork(network.name)
                      if (checkNetworkExists === undefined || checkNetworkExists === null || checkNetworkExists.length === 0) {
                        ConfirmModal(network.name)
                        return
                      }
                      await switchNetwork(network.name as networkNameTypes)
                      router.replace("/dashboard")
                    }}
                  colors={["rgba(197, 150, 255, 0.2)", "rgba(230, 161, 194, 0.2)", "rgba(255, 169, 150, 0.2)"]}
                >
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 20,
                      backgroundColor: isActive ? "#C496FF" : "transparent",
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1.5,
                      borderColor: isActive ? "#C496FF" : "#000",
                    }}>

                  </View>
                  <View style={{ gap: 5 }}>
                    <Text
                      style={[
                        CoreStyles.text({
                          fontFamily: 'Sora_600SemiBold', fontSize: dynamicFontSize(14)
                        }),
                        { textAlign: 'left' },
                      ]}
                    >{network.name.toUpperCase()}</Text>
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

export default ChangeNetworkTypePage
import { View, Text, KeyboardAvoidingView, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useCallback } from 'react'
import { Stack, router, Navigator } from 'expo-router'
import { dynamicFontSize } from '../../../auth/style'
import { LinearGradientComponent } from '../../dashboard/1'
import CoreStyles from '../../../src/core/index';
import { useUserData } from '../../../context/index';
import { updateAccount } from '../../../realm';
import { BSON } from 'realm'
const ChangeAddressTypePage = () => {
  const { activeAddresses, activeAccount } = useUserData();
  const updateActiveAccountAddressId = useCallback(async (addressId: BSON.ObjectId) => {
    await updateAccount(activeAccount._id, {
      activeAddressId: addressId
    })
    // refresh
    router.replace("/dashboard")
  }
    , [activeAccount])

  return (
    <View
      style={{ padding: 5, flex: 1, width: "100%", height: "100%" }
      }>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}>
        <View style={{ marginTop: 20, width: "100%", padding: 20, gap: 10 }}>
          {
            activeAddresses.map((address, index) => {
              const isActive = address._id.toString() === activeAccount.activeAddressId?.toString()

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
                  onPress={() => {
                    updateActiveAccountAddressId(address._id)
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
                      borderColor: isActive ? "#C496FF" : "black",
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
                    >{address.type}</Text>

                    <Text ellipsizeMode='middle'
                      numberOfLines={1} style={[CoreStyles.text({
                        color: "black",
                        fontFamily: "Manrope_500Medium", fontSize: dynamicFontSize(12)
                      }), { textAlign: "center", width: "80%", color: "rgba(163, 161, 161, 0.77)" }]}>
                      {address.address}</Text>
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

export default ChangeAddressTypePage
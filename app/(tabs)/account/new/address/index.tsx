import { View, Text, Dimensions, TextInput, FlatList, KeyboardAvoidingView, Image, Platform, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles, { dynamicFontSize } from '../../../../auth/style'
import CoreStyles from '../../../../src/core/index';
import LinearGradientButton from '../../../../src/components/GradientButton';
import { createAccount, updateWallet, getActiveWallet, IAddressSchema, networkNameTypes } from '../../../../realm';
// import { useToast, Toast, VStack, ToastTitle, ButtonText, ToastDescription, Button, Alert, AlertIcon, AlertText } from '@gluestack-ui/themed';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MiscManager from '../../../../src/utils/misc';
import { appRoutes } from '../../../../src/utils/routes';
import { useUserData } from '../../../../context/index';
const { width, height } = Dimensions.get('screen');

const ChooseAddress = () => {
    const [availableAddresses, setAvailableAddresses] = useState<IAddressSchema[]>([]);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(-1);
    const { networkName, accountName } = useLocalSearchParams() as { networkName: networkNameTypes, accountName: string };
    useEffect(() => {
        const fetchUserData = async () => {
            const availableAddress = await MiscManager.generateWalletAddress(3);
            setAvailableAddresses(availableAddress);
        };
        fetchUserData();
    }, []);

    const handleSubmit = async () => {
        try {
            const wallet = await getActiveWallet();
            const data = await createAccount({ privateKey: 'privateKey', addresses: availableAddresses, walletId: wallet!._id, selectedAddressIndex, name: accountName, networkName });
            router.replace(appRoutes.tabs.home);
        } catch (error) {
            console.error('error', error);
        }
    };
    const showError = (message: string) => {
        alert(message);
        // toast.show({
        //     placement: 'top',
        //     render: ({ id }) => {
        //         return (
        //             <Toast nativeID={id.toString()} action="attention" variant="solid">
        //                 <VStack space="xs">
        //                     <ToastDescription>
        //                         <Text style={[CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(14) }), { textAlign: 'center' }]}>
        //                             {message}
        //                         </Text>
        //                     </ToastDescription>
        //                 </VStack>
        //             </Toast>
        //         );
        //     },
        // });
    };
    return (
        <KeyboardAvoidingView style={[{ alignItems: "flex-start", padding: 20 }]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={{ width: "100%", alignItems: "center" }}>
                <View style={{ width: width * 0.8 }}>
                    <Text style={[CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(24) }), { textAlign: "center" }]}>Choose Address Type </Text>
                    <View style={[CoreStyles.space({ height: dynamicFontSize(10) }), { backgroundColor: 'transparent' }]} />
                    <Text style={[CoreStyles.text({ color: "#A3A1A1", fontFamily: "Manrope_600SemiBold", fontSize: dynamicFontSize(14) }), { textAlign: "center" }]}>This is the only means to recover your wallet. Do not share publicly</Text>
                </View>
                <View style={[CoreStyles.space({ height: dynamicFontSize(30) }), { backgroundColor: 'transparent' }]} />
                <View style={{ flexDirection: "row", width: "100%" }}>
                    <Text style={[CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(16) }), { textAlign: "left" }]}>Address Type available</Text>
                </View>
                <FlatList
                    style={{ gap: 40, width: "100%" }}
                    data={availableAddresses}
                    renderItem={({ item, index }) => (
                        // #C596FF, #E6A1C2, #FFA996
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedAddressIndex(index);
                            }}
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 60,
                                justifyContent: 'center',
                                marginVertical: 10,
                                padding: 10,
                                backgroundColor: selectedAddressIndex === index ? '#e6ddfc' : 'transparent',
                                borderRadius: 5,
                            }}
                        >
                            <View
                                style={[
                                    CoreStyles.space({ height: dynamicFontSize(15), width: dynamicFontSize(15) }),
                                    {
                                        borderColor: selectedAddressIndex === index ? '#C596FF' : 'black',
                                        borderWidth: 1,
                                        borderRadius: 100,
                                        marginLeft: 15,
                                        backgroundColor: selectedAddressIndex === index ? '#C596FF' : 'transparent',
                                    },
                                ]}
                            />
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
                                <View
                                    style={[styles.button, { backgroundColor: 'transparent', width: width - 40, height: 50, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 10 }]}
                                >
                                    <View>
                                        <Text style={[CoreStyles.text({ fontFamily: 'Sora_600SemiBold', fontSize: dynamicFontSize(14) }), { textAlign: 'center' }]}>{item.type}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => { }} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, width: width * 0.5 }}>
                                        <Text ellipsizeMode='middle' numberOfLines={1} style={[CoreStyles.text({ color: '#A3A1A1AA', fontFamily: 'Manrope_400Regular', fontSize: dynamicFontSize(14) }), { textAlign: 'center' }]}>{item.address}</Text>
                                        <MaterialCommunityIcons name='content-copy' size={15} color='gray' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />

                <View style={{ width: "100%", gap: 10 }}>
                    <Text style={[CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(14) }), { textAlign: "left" }]}>Custom HDPath (Optional)</Text>
                    <TextInput placeholder="Custom HD wallet Derivation Path" style={{ width: "100%", height: 50, backgroundColor: '#D9D9D926', paddingLeft: 20, borderRadius: 5, borderColor: "#D9D9D9", borderWidth: 1, fontSize: dynamicFontSize(12) }} />
                </View>
                <View style={[CoreStyles.space({ height: dynamicFontSize(20) }), { backgroundColor: 'transparent' }]} />
                <TouchableOpacity
                    onPress={() => {
                        if (selectedAddressIndex === -1) {
                            showError('Please select an address');
                        } else {
                            handleSubmit();
                        }
                    }}
                    style={[styles.button, { backgroundColor: 'transparent', width: width - 20, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 50 }]}
                >
                    <LinearGradientButton onPress={() => { null }} style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                        <Text style={{ fontFamily: 'Sora_600SemiBold', fontWeight: '600', fontSize: dynamicFontSize(16), color: 'black' }}>Continue</Text>
                    </LinearGradientButton>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
    )
}


export default ChooseAddress
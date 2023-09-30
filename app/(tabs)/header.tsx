import React, { useEffect, useState } from 'react';
import { View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CoreStyles from '../src/core/index';
import { dynamicFontSize } from '../auth/style';
import { Link } from 'expo-router';
import { IAccountSchema, IWalletSchema, IUserSchema } from '../realm';
import { ObjectId } from 'bson';
type TabHeaderProps = {
    data: {
        activeWallet: IWalletSchema;
        user: IUserSchema;
        activeAccount: IAccountSchema;
    };
};
const TabHeader = (({ data }: any) => {
    const { activeWallet, activeAccount } = data as TabHeaderProps['data'];
    
    return (
        <View style={{ display: data ? 'flex' : 'none' }}>
            <View
                style={{
                    height: 100,
                    width: '100%',
                    backgroundColor: 'white',
                    shadowColor: 'black',
                    shadowOffset: { width: 10, height: 10 },
                    elevation: 1,
                    shadowOpacity: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    paddingBottom: 20,
                    zIndex: 100,
                }}
            >
                <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Link
                        href="/account"
                        style={[
                            CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(14) }),
                            { textAlign: 'center' },
                        ]}
                    >
                        {activeAccount?.name}
                    </Link>
                    <MaterialIcons name="chevron-left" size={24} style={{ transform: [{ rotate: '-90deg' }] }} />
                </Pressable>
                <View
                    style={{
                        position: 'absolute',
                        backgroundColor: '#ebecfe',
                        right: dynamicFontSize(20),
                        bottom: dynamicFontSize(20),
                        paddingHorizontal: 10,
                        borderRadius: 5,
                        paddingVertical: 5,
                    }}
                >
                    <Link
                        href={{
                            pathname: "/wallet",
                            params: { activeAccount: activeAccount?._id }
                        }}

                        style={[
                            CoreStyles.text({ fontFamily: 'Sora_700Bold', fontSize: dynamicFontSize(10) }),
                            {
                                textAlign: 'center',
                            },
                        ]}
                    >
                        #{activeWallet.name || ''}
                    </Link>
                </View>
            </View>
        </View>
    );
});

export default TabHeader;

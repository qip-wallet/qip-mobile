import { Text, TextInput, Platform, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
const WebPage = () => {
    return (
        <View style={{ padding: 20, flex: 1 }
        }>
            <Text>WebPage</Text>
            <TextInput placeholder="test" />
        </View>
    )
}

export default WebPage
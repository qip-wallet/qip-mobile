import { Stack } from "expo-router";
import React from "react";
export default function SettingsLayout() {
    return <Stack screenOptions={{
        headerShown: false,
        title: "",
    }} >
        <Stack.Screen name="action" />
        <Stack.Screen name="passphrase" />
        <Stack.Screen name="address" />
    </Stack>;
}

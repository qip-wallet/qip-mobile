import React from "react";
import { Stack } from "expo-router";
export default function SettingsLayout() {
    return <Stack screenOptions={
        { headerShown: true, headerTitle: "" }
    } >
        <Stack.Screen name="1" />
        <Stack.Screen name="2" />
        <Stack.Screen name="3" />
        <Stack.Screen name="4" />
    </Stack>
}
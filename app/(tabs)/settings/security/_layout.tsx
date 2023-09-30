import React from "react";
import { Stack } from "expo-router";
export default function SettingsLayout() {
    return <Stack screenOptions={
        {
            headerShown: false,
        }
    } >
        <Stack.Screen name="biometrics" />
        <Stack.Screen name="change-password" />
    </Stack>;
}
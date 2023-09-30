import React from "react";
import { Stack } from "expo-router";
export default function SettingsLayout() {
    return <Stack screenOptions={
        {
            headerShown: true,
            title: ""
        }
    } >
        <Stack.Screen name="1" />
    </Stack>
}
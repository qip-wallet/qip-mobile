import { Stack } from "expo-router";
import React from "react";
export default function SettingsLayout() {
    return <Stack screenOptions={{
        headerShown: true,
        title: "",
    }} >
        <Stack.Screen name="new" />
    </Stack>;
}

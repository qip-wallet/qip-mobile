import React from "react";
import { Stack } from "expo-router";

export default function SettingsLayout() {
    return <Stack screenOptions={{
        headerShown: true,
        title: "",
    }} >
        <Stack.Screen name="1" options={{
            title: "Send to",
            headerTitleAlign: "center",
        }} />
        <Stack.Screen name="2" />
        <Stack.Screen name="3"
            options={{
                title: "Edit",
                headerTitleAlign: "left",
            }}
        />
    </Stack>;
}

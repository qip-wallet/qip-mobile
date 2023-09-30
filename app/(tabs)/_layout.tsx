import { Stack } from 'expo-router';
import { Tabs } from 'expo-router/tabs';

export default function AppLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name='dashboard' options={{ headerShown: false }} />
            <Stack.Screen name="account" options={{
                presentation: "modal",
                headerShown: false,
            }} />
            <Stack.Screen name="wallet" options={{
                presentation: "modal",
                headerShown: false,
            }} />
               <Stack.Screen name="send" options={{
                // presentation: "modal",
                headerShown: false,
            }} />
            {/* <Stack.Screen name="settings" options={{
                presentation: "modal",
                headerShown: false,
            }} /> */}
        </Stack>
    );
}

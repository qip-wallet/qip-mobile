import { Stack } from 'expo-router';
import { Tabs } from 'expo-router/tabs';
export default function AppLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name='address' options={{ headerShown: false }} />
            <Stack.Screen name='passphrase' options={{ headerShown: false }} />
            <Stack.Screen name='password' options={{ headerShown: false }} />
            <Stack.Screen name='wallet' options={{ headerShown: false }} />
        </Stack>
    );
}

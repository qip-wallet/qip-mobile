import { Stack } from 'expo-router';
import { Tabs } from 'expo-router/tabs';
export default function AppLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name='confirm' options={{ headerShown: false }} />
            <Stack.Screen name='generate' options={{ headerShown: false }} />
        </Stack>
    );
}

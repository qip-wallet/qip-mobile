import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { masterUserQuery } from './realm';
import Auth from './auth/password';
import { IUserSchema } from './realm';
import { Redirect, useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { appRoutes } from './src/utils/routes';

export default function App() {
  const [user, setUser] = useState<IUserSchema | undefined>();
  const router = useRouter();

  const fetchUserData = useCallback(async () => {
    try {
      const users = await masterUserQuery();
      console.log("users", users)
      setUser(users);
    } catch (error) {
      router.replace(appRoutes.auth.password);
    }
  }, [router]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const renderRedirect = () => {
    switch (user?.step) {
      case 0:
        return <Redirect href="/auth/password" />;
      case 1:
        return <Redirect href="/auth/wallet" />;
      case 2:
        return <Redirect href="/auth/address" />;
      case 3:
        return <Redirect href={appRoutes.tabs.home} />;
      default:
        return <Redirect href="/auth/password" />;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'padding'}
      enabled={false}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        {user ? renderRedirect() : <Auth />}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

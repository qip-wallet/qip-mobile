import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { masterUserQuery } from './realm';
import Auth from './auth/password';
import { IUserSchema } from './realm';
import { Redirect, useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { appRoutes } from './src/utils/routes';
import Login from "./auth/login"

export default function App() {
  const [user, setUser] = useState<IUserSchema | undefined>();
  const router = useRouter();

  const fetchUserData = useCallback(async () => {
    try {
      const users = await masterUserQuery();
      setUser(users);
    } catch (error) {
      router.replace(appRoutes.auth.password);
    }
  }, [router]);

  useEffect(() => {
    fetchUserData();
  }, []);
  // check if lastAuthenticated is later than 24 hours ago
  const lastAuthenticated = user?.lastAuthenticated
    ? new Date(user.lastAuthenticated) > new Date(Date.now() - 86400000)
    : false;

  const renderRedirect = () => {
    if (user) {
      if (!lastAuthenticated) {
        return <Redirect href="/auth/login" />
      }
      switch (user.step) {
        case 0:
          return <Redirect href="/auth/password" />;
        case 1:
          return <Redirect href="/auth/wallet" />;
        case 2:
          return <Redirect href="/auth/address" />;
        case 3:
          if (!lastAuthenticated) {
            return <Redirect href={appRoutes.tabs.home} />
          } else {
            return <Login />;
          }
        default:
          return <Redirect href="/auth/password" />;
      }
    } else {
      // If user doesn't exist, check for the token or any other conditions
      if (lastAuthenticated) {
        // If the user has a token, redirect to the appropriate screen
        return <Redirect href={appRoutes.tabs.home} />;
      } else {
        // If there's no user or token, show the login screen
        return <Login />;
      }
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
        {renderRedirect()}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

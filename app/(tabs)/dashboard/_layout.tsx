import { Stack, Tabs, router, useRouter } from "expo-router";
import { Text, View, StyleSheet, Dimensions, Pressable, KeyboardAvoidingView, Platform, Vibration } from "react-native";
import { MaterialIcons, Ionicons, Foundation, Feather, AntDesign, Entypo } from '@expo/vector-icons';
import LinearGradientButton from "../../src/components/GradientButton";
import { useEffect, useMemo, useState } from "react";
import { dynamicFontSize } from "../../auth/style";
import TabHeader from "../header";
import { useUserData } from '../../context/index';
const { width, height } = Dimensions.get("window");


export default function TabsLayout() {
    const routes = useMemo(() => [
        {
            name: "home",
            iconName: "home",
        },
        {
            name: "settings",
            iconName: "settings",
        },
        {
            name: "browse",
            iconName: "insert-link",
        },
        {
            name: "advance",
            iconName: "web",
        }
    ], []);

    const { user, activeWallet, activeAccount } = useUserData();
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : "height"} enabled={false} style={{ flex: 1, display: user && activeWallet && activeAccount ? "flex" : "none" }}>
            <TabHeader data={
                {
                    user,
                    activeWallet,
                    activeAccount
                }
            } />
            <View style={styles.container}>
                <Tabs screenOptions={{ headerShown: false }}
                    initialRouteName="home"
                    tabBar={(props) => {
                        return (
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%", height: 60,
                                backgroundColor: "transparent",
                                position: "relative",
                                bottom: 10,
                            }}>
                                <LinearGradientButton style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "90%",
                                    height: "100%",
                                    borderRadius: 5,
                                    paddingVertical: 10,
                                    paddingHorizontal: 30,
                                    position: "relative",
                                }}>
                                    {props.state.routes.map((route, index) => {
                                        const isFocused = props.state.index === index;
                                        const onPress = () => {
                                            Vibration.vibrate(10);
                                            props.navigation.navigate(route.name);
                                            // router.push({ pathname: `(tabs)/dashboard/${route.name}`, params: { data: { user, activeWallet, activeAccount } } })
                                        };
                                        return (
                                            <Pressable
                                                onPress={onPress}
                                                style={{
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    flexDirection: "row",
                                                    gap: 5,
                                                    backgroundColor: isFocused ? "#d9b4f0" : "transparent",
                                                    borderRadius: 100,
                                                    height: "100%",
                                                    paddingHorizontal: 10,
                                                }}
                                                key={index}
                                            >
                                                {routes[index] && (
                                                    <>
                                                        <MaterialIcons name={routes[index].iconName as any} color={isFocused ? "white" : "#2f2f2f"} size={24} />
                                                        <Text style={{
                                                            display: isFocused ? "flex" : "none", color: isFocused ? "white" : "#2f2f2f", fontFamily: "Sora_700Bold",
                                                            fontSize: dynamicFontSize(12)
                                                        }}>{routes[index].name}</Text>
                                                    </>
                                                )
                                                }

                                            </Pressable>
                                        );
                                    })}
                                </LinearGradientButton>
                            </View>
                        );
                    }
                    }
                >
                </Tabs>
            </View >
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height,
        position: "relative",
        bottom: 0, // Keep it at the bottom
        left: 0,
        right: 0,
        elevation: 0,
        width,
        flex: 1,
        backgroundColor: "white"
    }
});

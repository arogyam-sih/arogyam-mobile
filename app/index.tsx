import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

export const unstable_settings = {
  initialRouteName: "login",
};

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        if (userToken) {
          // User is logged in, navigate to the main app
          router.replace("/(tabs)");
        } else {
          // User is not logged in, navigate to login screen
          router.replace("/login");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        // If there's an error, default to the login screen
        router.replace("/login");
      } finally {
        setIsReady(true);
      }
    };

    checkLoginStatus();
  }, [router]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

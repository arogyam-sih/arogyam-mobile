import { Stack } from "expo-router";
import { useEffect, useState } from "react";

export const unstable_settings = {
  initialRouteName: "login",
};

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Perform any necessary async operations here
    // For example, checking if the user is logged in
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }
  return (
    <Stack initialRouteName="login">
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

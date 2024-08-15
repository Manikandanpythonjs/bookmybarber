import { SplashScreen, Stack, } from "expo-router";
import { useEffect } from "react";
import { useFonts } from 'expo-font'
import { AuthProvider } from "@/utils/context/AuthContext";

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Light": require("../assets/fonts/OpenSans-Light.ttf"),
    "OpenSans-SemiBold": require("../assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-Medium": require("../assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans_SemiCondensed-Medium": require("../assets/fonts/OpenSans_SemiCondensed-Medium.ttf"),
    "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });


  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <AuthProvider>

      <Stack screenOptions={{
        headerShown: false,
        statusBarAnimation: "slide",
        animation: "slide_from_right"
      }}>
        <Stack.Screen name="index" />
      </Stack>
    </AuthProvider>
  );
}

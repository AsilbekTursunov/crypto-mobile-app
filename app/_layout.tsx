import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "../global.css"
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { enableLegacyWebImplementation } from 'react-native-gesture-handler';

configureReanimatedLogger({
  level: ReanimatedLogLevel.error,
  strict: false, // Strict mode'ni o‘chiradi
});
enableLegacyWebImplementation(true);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

persistQueryClient({
  queryClient,
  persister: {
    persistClient: async (persistedClient) => {
      await AsyncStorage.setItem('persistedClient', JSON.stringify(persistedClient));
    },
    restoreClient: async () => {
      const persistedClient = await AsyncStorage.getItem('persistedClient');
      return persistedClient ? JSON.parse(persistedClient) : undefined;
    },
    removeClient: async () => {
      await AsyncStorage.removeItem('persistedClient');
    },
  },
});

export default function RootLayout() {

  const [loaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Jakarta": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack initialRouteName='index'>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
        <Stack.Screen name="coins" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} /> 
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </QueryClientProvider>
  );
}

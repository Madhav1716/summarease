import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="chat" options={{ headerShown: false }} />
        <Stack.Screen name="screens/chat-history" options={{ headerShown: false }} />
        <Stack.Screen name="screens/select-pdf" options={{ headerShown: false }} />
        <Stack.Screen name="screens/privacy-policy" options={{ headerShown: false }} />
        <Stack.Screen name="screens/terms-of-service" options={{ headerShown: false }} />
        <Stack.Screen name="screens/settings" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}

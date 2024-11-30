import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';  // Import StatusBar

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />  
      <Stack
        screenOptions={{
          headerShown: false,  
        }}
      >
        <Stack.Screen name="index" />

        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
          }}
        />


      </Stack>
    </>
  );
}

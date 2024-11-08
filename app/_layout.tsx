import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { Stack, useRouter, useSegments } from 'expo-router'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export default function RootLayout() {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const router = useRouter();
  const segments = useSegments();



  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log("onAuthStateChanged", user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber;
  }, []);

  useEffect(() => {
    if(initializing) return;

    const inAuthGroup = segments[0] === '(auth)' as string;

    if (user && !inAuthGroup) {
      router.replace('/(auth)/home');
    } else if (!user && inAuthGroup) {
      router.replace('/');
    }
  }, [user, initializing]);
  


  return (
    <Stack>
      <Stack.Screen name='index'/>
      <Stack.Screen name='(auth)' options={{ headerShown: false }}/>
      <Stack.Screen name="profile" />
    </Stack>
  )
}
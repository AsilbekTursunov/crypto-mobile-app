import React, { useEffect } from 'react'
import { Redirect, router } from 'expo-router'
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '@/constants';
import { useUserStore } from '@/store';
import ScreenLoader from '@/components/Load';
import { enableLegacyWebImplementation } from 'react-native-gesture-handler';
enableLegacyWebImplementation(true);
const MainPage = () => { 
  const { setUserData } = useUserStore()


  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      // console.log(token);

      if (!token) {
        router.push("/auth/welcome"); // 🔴 Redirect ishlaydi 
      }
      try {
        const response = await fetch(`${API}/refresh`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          await AsyncStorage.setItem("token", data.token);
          setUserData(data.user);
          router.push("/tabs/home"); // 🔴 Redirect ishlaydi
        } else {
          router.push("/auth/welcome");
        }
      } catch (error: any) {
        Alert.alert('Sign in error', error.message)
        router.push("/auth/welcome");
      }
    })();
  }, []);
  return <ScreenLoader />
}
export default MainPage

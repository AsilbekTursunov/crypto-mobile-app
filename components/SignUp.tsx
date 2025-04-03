import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import InputField from '@/components/InputField'
import { useStore } from 'zustand'
import { useUserStore } from '@/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { API } from '@/constants'
import { useMutation } from '@tanstack/react-query'
const SignUp = () => {
  const [userName, setUserName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { setUserData, user } = useUserStore()
  const ok = !userName && !email && !password

  const { mutate } = useMutation({
    mutationKey: ['register'],
    mutationFn: async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: userName, email, password }),
        });

        const data = await response.json(); // Har doim JSON formatni oling

        if (!response.ok) {
          console.log('Failed to register:', data);
          throw new Error(data?.message || 'Failed to register');
        }

        // Foydalanuvchi ma'lumotlarini saqlash
        setUserData(data.user);
        await AsyncStorage.setItem('token', data.token);

        // Navigatsiya qilish
        router.push('/tabs/home');

      } catch (error) {
        console.error('Failed to register:', error);
      } finally {
        setLoading(false);
      }
    }
  });


  return (
    <View className='flex flex-col gap-4 w-full'>
      <View className='flex flex-col w-full items-start gap-4 mb-4'>
        <Text className='font-JakartaBold text-white text-3xl'>Sign Up</Text>
        <InputField
          labelStyle='mb-2 text-lg'
          label='Username'
          value={userName}
          onChangeText={setUserName}
        />
        <InputField
          labelStyle='mb-2 text-lg'
          label='Email'
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          labelStyle='mb-2 text-lg'
          label='Password'
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity disabled={ok} onPress={() => mutate()} className={`w-full  bg-bgPrimary rounded-xl py-3 ${ok ? 'opacity-30' : ''}`}>
        {loading ? <>
          <ActivityIndicator size='large' color='white' />
        </> : <>
          <Text className='font-JakartaMedium text-center text-primary text-xl'>Sign Up</Text>
        </>}
      </TouchableOpacity>
    </View>
  )
}

export default SignUp
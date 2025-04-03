import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import InputField from '@/components/InputField'
import { useUserStore } from '@/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Link, router } from 'expo-router'
import { API } from '@/constants'
import { useMutation } from '@tanstack/react-query'
const SignIn = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { setUserData, user } = useUserStore()
  const ok = !email && !password

  const { mutate } = useMutation({
    mutationKey: ['register'],
    mutationFn: async () => {
      setLoading(true)
      try {
        const response = await fetch(`${API}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })
        if (!response.ok) {
          console.log('Failed to register response.ok  false')
        }
        const data = await response.json()
        setUserData(data.user)
        await AsyncStorage.setItem('token', data.token)
        router.push('/tabs/home')
      } catch (error) {
        console.error('Failed to register:', error)
        throw new Error('Failed to register')
      } finally {
        setLoading(false)
      }
    }
  })

  return (
    <View className='flex flex-col gap-4 w-full'>
      <View className='flex flex-col w-full items-start gap-4 mb-4'>
        <Text className='font-JakartaBold text-white text-3xl'>Sign In</Text>
        <InputField
          labelStyle='mb-2 text-lg'
          label='Email'
          placeholder='Enter your email'
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          labelStyle='mb-2 text-lg'
          label='Password'
          value={password}
          placeholder='Enter your password'
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </View> 
      <TouchableOpacity disabled={ok} onPress={() => mutate()} className={`w-full  bg-bgPrimary rounded-xl py-3 ${ok ? 'opacity-30' : ''}`}>
        {loading ? <>
          <ActivityIndicator size='large' color='white' />
        </> : <>
          <Text className='font-JakartaMedium text-center text-primary text-xl'>Sign in</Text>
        </>}
      </TouchableOpacity>
    </View>
  )
}

export default SignIn
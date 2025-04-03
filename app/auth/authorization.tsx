import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import { StatusBar } from 'expo-status-bar'

const Authorization = () => {
  const [type, setType] = useState<'sign-in' | 'sign-up'>('sign-in')
  return (
    <ScrollView className='w-full h-screen bg-bgDark flex-1 flex py-20  px-4'>
      <View className='bg-mainDark p-2 rounded-2xl w-full flex-row flex self-start gap-2 mb-32'>
        <TouchableOpacity onPress={() => setType('sign-in')} className={`flex-1 ${type == 'sign-in' ? 'bg-bgDark' : 'bg-mainDark'}  rounded-2xl py-3`}>
          <Text className={`${type == 'sign-in' ? 'text-white' : 'text-textBlue'} text-center font-JakartaLight text-lg`}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setType('sign-up')} className={`flex-1 ${type == 'sign-up' ? 'bg-bgDark' : 'bg-mainDark'}  rounded-2xl py-3`}>
          <Text className={`${type == 'sign-up' ? 'text-white' : 'text-textBlue'} text-center font-JakartaLight text-lg`}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      {type == 'sign-in' ? <SignIn /> : <SignUp />}
      <StatusBar style='light' />
    </ScrollView>
  )
}

export default Authorization
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { useUserStore } from '@/store'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { Link, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import Loader from '@/components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const router = useRouter()
  const { user } = useUserStore()

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('token')
      router.push({ pathname: '/auth/welcome' })
    } catch (error) {
      console.log('logOut error', error)
    }
  }
  if (user == null) return <Loader />
  return (
    <View className='w-full h-screen bg-mainDark flex-1 flex relative flex-col'>
      <View className=' top-12 flex flex-row items-center  justify-between absolute w-full  z-50'>
        <Link href={'/tabs/home'} className=' rounded-full ml-4 p-3'><Ionicons name="arrow-back" size={24} color="#5ED5A8" /></Link>
      </View>
      <View className='h-[200px] w-full relative'>
        <LinearGradient
          start={{ x: 0.5, y: 1 }} // Pastdan boshlaydi
          end={{ x: 0.5, y: 0 }}   // Tepaga yo‘naladi
          colors={['#5ed5a744', 'transparent']}
          style={styles.background}
        />
      </View>
      <View className=' flex items-center relative w-full justify-end h-40 '>
        <Image className='absolute -top-20 size-44  bg-bgDark border border-white  rounded-full' src={user?.image} />
        <Text className='text-white text-2xl font-JakartaBold'>{user?.username}</Text>
      </View>
      <View className='flex flex-col gap-2 px-3 mt-10'>
        <View className=' border-t border-t-textGray/10 py-3 flex flex-row gap-3 items-center w-full justify-between'>
          <Text className='text-textBlue text-lg font-JakartaNormal'>Username</Text>
          <Text className='text-textGray text-lg font-JakartaLight'>{user?.username}</Text>
        </View>
        <View className=' border-t border-t-textGray/10 py-3 flex flex-row gap-3 items-center w-full justify-between'>
          <Text className='text-textBlue text-lg font-JakartaNormal'>Email</Text>
          <Text className='text-textGray text-lg font-JakartaLight'>{user?.email}</Text>
        </View>
        <View className=' border-t border-t-textGray/10 py-3 flex flex-row gap-4 items-center w-full justify-between'>
          <Text className='text-textBlue text-lg font-JakartaNormal'>Since</Text>
          <Text className='text-textGray text-lg font-JakartaLight'>{moment(user?.createdAt).format('LL')}</Text>
        </View>
      </View>
      <View className='flex-1 justify-end items-center px-5'>
        <TouchableOpacity onPress={logOut} className='flex flex-row items-center justify-center gap-2 mb-4 bg-bgDark w-full py-4 rounded-xl '>
          <Text className='text-white text-lg font-medium'>Log out</Text>
          <Ionicons name="log-out-outline" size={24} color="#5ED5A8" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProfileScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 200,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});
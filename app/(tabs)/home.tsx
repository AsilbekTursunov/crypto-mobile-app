import { View, Text, RefreshControl, Image, ImageProps, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useOrderStore } from '@/store'
import { CryptoData } from '@/types'
import { get100Coins } from '@/lib/actions/order'
import icons from '@/constants/icons'
import OrderCard from '@/components/OrderCard'
import Loader from '@/components/Loader'

const HomeScreen = () => {
  const { data, setData } = useOrderStore();
  const [refreshing, setRefreshing] = useState(false);
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const getData = async () => {
    try {
      const response = await get100Coins()
      setData(response as CryptoData[])
    } catch (error) {
      console.error('Error getting orders home', error)
    }
  }
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getData()
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getData()
  }, [])
  const filterData = searchTerm && data?.filter(coin => coin.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      className='bg-mainDark h-screen relative'>
      <View className='w-full  pb-5  px-4 flex flex-row bg-bgDark  shadow shadow-mainDark justify-between items-center'>
        <View className='flex flex-row items-center justify-between mt-16 w-full'>
          <View className='flex flex-row flex-wrap line-clamp-1 items-center gap-3'>
            <Text className='text-2xl font-JakartaMedium text-white'>
              Welcome to
            </Text>
            <Text className=' capitalize text-bgPrimary font-JakartaSemiBold text-xl'>
              Titans Crypto 👋
            </Text>
          </View>
          <View className='flex flex-row gap-2 items-center '>
            <TouchableOpacity onPress={() => setOpen(prev => !prev)}>
              <Image source={icons.search as ImageProps} className='size-6' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className={` flex-row items-center justify-between px-4 mt-5   w-full ${open ? 'flex' : 'hidden'}`}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <TextInput
            onChangeText={(value) => setSearchTerm(value)}
            placeholder='Search crypto currencies'
            className='border border-bgPrimary/10 w-full h-14 rounded-lg  px-4 placeholder:text-slate-700' />
        </TouchableWithoutFeedback>
      </View>
      <View className='mx-4 flex flex-1 '>
        {data && !refreshing ? (
          <>
            {(filterData ? filterData : data ).map(item => <OrderCard key={item.name} order={item} />)}
          </>
        ) : (
          <View className='flex-1 items-center justify-center   h-screen'>
            <Loader />
          </View>
        )}
      </View>
      <StatusBar style='light' />
    </ScrollView>
  )
}

export default HomeScreen
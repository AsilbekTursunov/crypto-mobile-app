import { View, Text, RefreshControl, FlatList, Image, ImageProps, ActivityIndicator,  TouchableOpacity } from 'react-native'
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
  const [page, setPage] = useState(1)

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
    setPage(1)
    await getData()
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getData()
  }, [])
  // console.log('response', data[0]?.name)
  return (
    <View className='bg-mainDark h-full flex-1 relative'>
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
          <View className='flex flex-row gap-2 items-center'>
            <TouchableOpacity>
              <Image source={icons.search as ImageProps} className='size-6' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className='mx-4 flex-1'>
        {data ? (
          <FlatList
            className='py-4'
            data={data.slice(0, Number(`${page}0`))}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <OrderCard order={item} />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
            <Loader />
        )}
      </View>
      <View className='flex flex-row items-center bg-transparent absolute bottom-4 right-4'>
        <TouchableOpacity onPress={() => setPage(prev => prev + 1)} className='w-fit bg-bgPrimary px-4 py-2   transform rounded-2xl '><Text className='text-xl '>More</Text></TouchableOpacity>
      </View>
      <StatusBar style='light' />
    </View>
  )
}

export default HomeScreen
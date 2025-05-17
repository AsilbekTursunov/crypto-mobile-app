import { View, Text, RefreshControl, Image, ImageProps, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useCoinStore, useOrderStore, useUserStore } from '@/store'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { Coin, CryptoData } from '@/types'
import icons from '@/constants/icons'
import OrderCard from '@/components/OrderCard'
import Loader from '@/components/Loader'
import { Link } from 'expo-router'
import axios from 'axios'
import useGetCoins from '@/hooks/useGetCoins'
import { fetchCoinGecko } from '@/lib/actions/order'

const HomeScreen = () => {
  const { user } = useUserStore()
  const { data, refetch, fetchCoins, error, loading } = useGetCoins()
  const { setCoins, coins } = useCoinStore()
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState<number>()
  const [refreshing, setRefreshing] = useState(false);
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')


  useEffect(() => {
    const fetchCoinGecko = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=${1}`,
        {
          method: 'GET',
          headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-mH4cERDndy92fwRYm2MsHqJv' },
        }
      ).then((res) => res.json()).then(data => {
        console.log(data);

      })
    }
    fetchCoinGecko()
    // refetch(1)
  }, [])


  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch(1) 
    setRefreshing(false);
  }, []);




  // const filterData = searchTerm && coins?.filter((coin: Coin) => coin.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
  return (
    <View className='flex flex-1 flex-col bg-mainDark'>
      <View className='w-full  pb-5  px-4 flex flex-row bg-bgDark  shadow shadow-mainDark justify-between items-center'>
        <View className='flex flex-row items-center justify-between mt-14 w-full'>
          <View className='flex flex-row flex-wrap line-clamp-1 items-center gap-3'>
            <Text className=' capitalize text-bgPrimary font-JakartaSemiBold text-xl'>
              Hi
            </Text>
            <Text className='text-xl font-JakartaMedium text-neutral-300'>
              {user?.username} 👋 wdaw
            </Text>
          </View>
          <View className='flex flex-row gap-5'>
            <View className='flex flex-row gap-2 items-center '>
              <TouchableOpacity onPress={() => setOpen(!open)}>
                <Image source={icons.search as ImageProps} className='size-6' />
              </TouchableOpacity>
            </View>
            <Link href={'/profile'} className=' flex items-center justify-center rounded-full'>
              <Image src={user?.image} className='size-10 border border-bgPrimary relative block  rounded-full p-2' />
            </Link>
          </View>
        </View>
      </View>
      <View className='bg-mainDark h-screen relative px-4'>
        <View className={` flex-row items-center justify-between px-4 mt-5   w-full ${open ? 'flex' : 'hidden'}`}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <TextInput
              onChangeText={(value) => setSearchTerm(value)}
              placeholder='Search crypto currencies'
              keyboardType='default'
              className='border border-bgPrimary/10 w-full h-14 rounded-lg  px-4 placeholder:text-slate-700' />
          </TouchableWithoutFeedback>
        </View>
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          data={data}
          renderItem={({ item }) => <OrderCard key={item.name} order={item} />}
          keyExtractor={(item, index) => item.name || index.toLocaleString()}
          onEndReached={() => {

          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={refreshing ? <ActivityIndicator size="large" color="blue" /> : null}
        /> */}
        <StatusBar style='light' />
      </View>
    </View>
  )
}

export default HomeScreen
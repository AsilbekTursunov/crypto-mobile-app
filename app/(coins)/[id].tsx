import { View, Text, Image, ScrollView, ImageProps, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useChartStore, userDataStore } from '@/store'
import { getCoinData, getPrices } from '@/lib/actions/order'
import { settingCoinObject } from '@/lib/hooks'
import icons from '@/constants/icons'
import { Link, router } from 'expo-router'
import CurrencyChart from '@/components/CurrenyChart'
import Loader from '@/components/Loader'
import { RefreshControl } from 'react-native-gesture-handler'
import { useQuery } from '@tanstack/react-query'
import { convertFixed, convertLocal } from '@/lib/utils/token'

const CoinDetail = () => {
  const { id } = useLocalSearchParams()
  const { data, setData } = userDataStore()
  const { setChart } = useChartStore()
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false)
  const [days, setDays] = useState(1);
  const [refreshing, setRefreshing] = useState(false);



  const { data: coin, isLoading, error: coinError, refetch } = useQuery({
    queryKey: ['coin'],
    queryFn: async () => {
      const coinData = await getCoinData(id.toString())
      if (coinData) {
        settingCoinObject(coinData, setData);
      } 
      const prices = await getPrices(id.toString(), days, setError);
      setChart(prices);
      return coinData;
    },
    staleTime: 1000 * 60 * 5, // 5 daqiqa davomida eski ma’lumotni ishlatadi 
  })

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch()
    setRefreshing(false);
  }, []);



  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]); 

  if (!coin && refreshing) return <Loader />
  return (
    <> 
      {coin.id && (
        <View className='w-screen h-screen bg-mainDark  flex-1  pt-14'>
          <Link className='border border-bgPrimary mx-4  p-2 size-14 mb-2 rounded-full flex items-center justify-center' onPress={() => {
            setChart(null);
          }} href={'/(tabs)/home'}><Image source={icons.back as ImageProps} className='size-8' tintColor={'#5ED5A8'} /></Link>
          <ScrollView
            className='px-5 flex-1 pt-5 bg-mainDark'
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View className='flex flex-col gap-5 pb-5'>
              <View className='flex flex-row justify-start gap-5 items-center'>
                <View className='border border-bgPrimary p-2 size-28 rounded-full'>
                  <Image src={data?.image} className='size-full rounded-full' />
                </View>
                <View className='flex flex-col gap-1'>
                  <Text className='text-4xl text-white font-JakartaBold '>{data?.name}</Text>
                  <Text className='text-2xl text-textGray font-JakartaLight uppercase'>{data?.symbol}</Text>
                </View>
              </View>
              <View className='flex flex-row items-center justify-between'>
                <View className='flex flex-row gap-2 mt-10 items-center'>
                  <View className='flex flex-col gap-1'>
                    <Text className='text-lg text-white font-JakartaBold '>Current Price</Text>
                    <Text className='text-base text-textGray font-JakartaLight uppercase'>Margin</Text>
                  </View>
                </View>
                <View className='flex flex-col gap-2 mt-10 items-end'>
                  <Text className='text-lg text-white font-JakartaBold'>${convertFixed(data?.current_price)}</Text>
                  <Text className={`text-xs  flex  font-bold ${data.price_change_percentage_24h >= 0 ? 'text-textGreen' : 'text-textRed'}`}>{convertFixed(data?.price_change_percentage_24h)}%</Text>
                </View>
              </View>
              <View className='flex flex-row items-center justify-between'>
                <Text className='text-sm text-white font-JakartaLight'>Total</Text>
                <Text className='text-sm text-white font-JakartaLight'>${convertLocal(data?.total_volume)}</Text>
              </View>
              <View className='flex flex-row items-center justify-between'>
                <Text className='text-sm text-white font-JakartaLight'>Market Cup</Text>
                <Text className='text-sm text-white font-JakartaLight'>${convertLocal(data?.market_cap)}</Text>
              </View>
              <View className='flex flex-row rounded-lg bg-mainDark p-2 gap-2'>
                <TouchableOpacity onPress={() => setDays(1)} className={`flex-1  rounded-lg  `}>
                  <Text className={`text-sm  text-center py-2 rounded-lg font-JakartaSemiBold ${days == 1 ? 'bg-bgPrimary text-bgDark' : 'bg-bgDark text-white'}`}>1d</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDays(7)} className={`flex-1 font-semibold  rounded-lg  `}>
                  <Text className={`text-sm  text-center py-2 rounded-lg font-JakartaSemiBold ${days == 7 ? 'bg-bgPrimary text-bgDark' : 'bg-bgDark text-white'}`}>7d</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDays(14)} className={`flex-1 font-semibold  rounded-lg  `}>
                  <Text className={`text-sm  text-center py-2 rounded-lg font-JakartaSemiBold ${days == 14 ? 'bg-bgPrimary text-bgDark' : 'bg-bgDark text-white'}`}>14d</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDays(30)} className={`flex-1 font-semibold  rounded-lg  `}>
                  <Text className={`text-sm  text-center py-2 rounded-lg font-JakartaSemiBold ${days == 30 ? 'bg-bgPrimary text-bgDark' : 'bg-bgDark text-white'}`}>30d</Text>
                </TouchableOpacity>
              </View>
              <View className='overflow-hidden'>
                <CurrencyChart />
              </View>
              <View className='flex flex-row items-center justify-between mb-3'>
                <Text className='text-xs text-white font-JakartaLight text-justify'>{data?.desc}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  )

}

export default CoinDetail
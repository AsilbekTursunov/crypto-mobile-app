import { View, Text, Image, ScrollView, ImageProps, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useChartStore, userDataStore } from '@/store'
import { getCoinData, getPrices } from '@/lib/actions/order'
import { settingCoinObject } from '@/lib/hooks'
import icons from '@/constants/icons'
import { router } from 'expo-router'
import CurrencyChart from '@/components/CurrenyChart'
import Loader from '@/components/Loader'

const CoinDetail = () => {
  const { id } = useLocalSearchParams()
  const { data, setData } = userDataStore()
  const { setChart } = useChartStore()
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false)
  const [days, setDays] = useState(1);
  const [priceType, setPriceType] = useState('prices');
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      
      const coinData = await getCoinData(id.toString());
      if (coinData) {
        settingCoinObject(coinData, setData);
      }
      
      const prices = await getPrices(id.toString(), days, setError);
      setChart(prices); 
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (!data) return <Loader />
  return (
    <View className='w-screen h-full  bg-bgDark  flex-1  pt-10'>
      <TouchableOpacity onPress={() => {
        router.push('/(root)/home')
        setChart(null);
        setData(null);
      }} className='border border-bgPrimary mx-4 p-2 size-14 mb-2 rounded-full flex items-center justify-center'>
        <Image source={icons.back as ImageProps} className='size-8' tintColor={'#5ED5A8'} />
      </TouchableOpacity>
      <ScrollView className='px-5 flex-1 pt-5'>
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
              <Text className='text-lg text-white font-JakartaBold'>${data?.current_price?.toFixed(2)}</Text>
              <Text className={`text-xs  flex  font-bold ${data.price_change_percentage_24h >= 0 ? 'text-textGreen' : 'text-textRed'}`}>{data.price_change_percentage_24h.toFixed(2)}%</Text>
            </View>
          </View>
          <View className='flex flex-row items-center justify-between'>
            <Text className='text-sm text-white font-JakartaLight'>Total</Text>
            <Text className='text-sm text-white font-JakartaLight'>${data?.total_volume.toLocaleString()}</Text>
          </View>
          <View className='flex flex-row items-center justify-between'>
            <Text className='text-sm text-white font-JakartaLight'>Market Cup</Text>
            <Text className='text-sm text-white font-JakartaLight'>${data?.market_cap.toLocaleString()}</Text>
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
  )
}

export default CoinDetail
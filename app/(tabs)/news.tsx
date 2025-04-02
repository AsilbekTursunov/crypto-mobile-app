import { View, Text, RefreshControl, ScrollView, } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNewsStore } from '@/store'
import { NewArticle } from '@/types'
import { getNews } from '@/lib/actions/order' 
import Loader from '@/components/Loader' 
import NewsCard from '@/components/NewsCard'
import { useQuery } from '@tanstack/react-query'

const NewsScreen = () => { 
  const [refreshing, setRefreshing] = useState(false); 

  const { data: news, isLoading, error: coinError, refetch } = useQuery({
    queryKey: ['news'],
    queryFn: ({ queryKey }) => getNews(),
    staleTime: 1000 * 60 * 5, // 5 daqiqa davomida eski ma’lumotni ishlatadi 
  })

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch()
    setRefreshing(false);
  }, []);

  useEffect(() => {
    refetch()
  }, [])
  if (!news) return <Loader />  
  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      className='bg-mainDark h-screen flex'>
      <View className='bg-mainDark w-full h-full flex-1 mt-10'>
        <View className='flex flex-row items-center justify-between  px-4 py-5'>
          <Text className='text-2xl font-JakartaMedium text-white'>Latest News</Text>
        </View>
        <View className='mx-4 flex flex-1 flex-col '>
          {news && !refreshing ? (
            <>
              {news?.results.map((item: NewArticle) => <NewsCard key={item.article_id} data={item} />)}
            </>
          ) : (
            <View className='flex-1 items-center justify-center   h-screen'>
              <Loader />
            </View>
          )}
        </View>
      </View>
      <StatusBar style='light' />
    </ScrollView>
  )
}

export default NewsScreen
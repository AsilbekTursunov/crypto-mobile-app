import NewsCard from '@/components/NewsCard'
import { getNews } from '@/lib/actions/order'
import { NewArticle } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useState } from 'react'
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native'

const NewsScreen = () => {
  const [refreshing, setRefreshing] = useState(false)
  const { data, refetch } = useQuery({
    queryKey: ['news'],
    queryFn: () => getNews(),
    // staleTime: 1000 * 60 * 5, // 5 daqiqa davomida eski ma’lumotni ishlatadi 
  }) 

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch()
    setRefreshing(false);
  }, []);

  if (!data) return <ActivityIndicator size={50} />
  return (
    <View className='bg-bgDark'>
      <View className='flex  mt-20 flex-row items-center justify-between  px-4 pb-4'>
        <Text className='text-2xl font-JakartaMedium text-white'>Latest News</Text>
      </View>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        className='bg-mainDark h-screen flex'>
        <View className='bg-mainDark w-full h-full flex-1 mt-10'>

          <View className='mx-4 flex flex-1 flex-col '>
            {data && !refreshing ? (
              <>
                {data?.results.map((item: NewArticle) => <NewsCard key={item.article_id} data={item} />)}
              </>
            ) : (
              <View className='flex-1 items-center justify-center   h-screen'>
                <ActivityIndicator size={50} />
              </View>
            )}
          </View>
        </View>
        <StatusBar style='light' />
      </ScrollView>
    </View>
  )
}

export default NewsScreen
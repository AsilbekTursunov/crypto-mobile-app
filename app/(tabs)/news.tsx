import { View, Text, RefreshControl, ScrollView, } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNewsStore } from '@/store'
import { NewArticle } from '@/types'
import { getNews } from '@/lib/actions/order' 
import Loader from '@/components/Loader' 
import NewsCard from '@/components/NewsCard'

const NewsScreen = () => {
  const { news, setNews } = useNewsStore();
  const [refreshing, setRefreshing] = useState(false);

  const getData = async () => {
    try {
      const response = await getNews()
      setNews(response.results as NewArticle[]) 
    } catch (error) {
      console.error('Error getting news', error)
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
              {news.map(item => <NewsCard key={item.article_id} data={item}/>)}
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
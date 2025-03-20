import { View, Text, Image, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import { NewArticle } from '@/types'
import moment from 'moment'
import { router } from 'expo-router'

const NewsCard = ({ data }: { data: NewArticle }) => {

  const openWebsite = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Error opening URL:", err));
  };
  return (
    <View className='bg-slate-800/80 p-4 rounded-2xl overflow-hidden flex flex-col gap-2 mb-5'>
      <Image src={data.image_url ? data.image_url : data.source_icon} className='w-full h-40 rounded-2xl' />
      <Text className='text-xl text-white'>{data.title}</Text>
      <Text className='text-sm text-textGray'>{moment(data.pubDate).format('DD MMM, YYYY')}</Text>
      <Text className='text-xs text-slate-700 text-justify line-clamp-5'>{data.description}</Text>
      <TouchableOpacity onPress={() => openWebsite(data.link)} className='text-lg font-semibold text-bgPrimary'>
        <Text className='text-bgPrimary'>Go to source</Text>
      </TouchableOpacity>
    </View>
  )
}

export default NewsCard
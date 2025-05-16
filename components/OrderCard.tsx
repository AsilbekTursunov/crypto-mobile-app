import { Coin, CryptoData } from '@/types';
import { View, Text, Image, ImageProps, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import images from '@/constants/images';
import { convertFixed, sliceText } from '@/lib/utils/token';

const OrderCard = ({ order }: { order: Coin }) => { 

  return (
    <TouchableOpacity onPress={() => router.push({ pathname: '/coins/[id]', params: { id: order?.uuid } })} className={`w-full flex flex-row items-center justify-between gap-1 mb-4 relative  border-b border-b-bgDark py-3`} >
      <View className='flex flex-row gap-2'>
        <Image source={
          { uri: order.iconUrl }
        } className='size-12 rounded-full object-cover  ' />
        <View className='flex flex-col'>
          <Text className='text-lg text-white font-JakartaBold '>{sliceText(order.name, 8)}</Text>
          <Text className='text-base text-textGray font-JakartaLight uppercase'>{order?.symbol}</Text>
        </View>
      </View>
      {Number(order.change) < 0 ? (
        <Image source={images.dicrease as ImageProps} className='w-44 h-10 ' resizeMode='contain' />
      ) : (
        <Image source={images.increase as ImageProps} className='w-44 h-10' resizeMode='contain' />
      )}
      <View className='flex flex-col items-end justify-end'>
        <Text className='text-lg  font-bold text-white'>${convertFixed(order?.price)}</Text>
        <Text className={`text-xs  flex  font-bold ${Number(order.change) >= 0 ? 'text-textGreen' : 'text-textRed'}`}>{order.change}%</Text>
      </View>
    </TouchableOpacity>
  )
}

export default OrderCard

const styles = StyleSheet.create({
  image: {
    width: 48,          // 'size-12' = 48px
    height: 48,
    borderRadius: 24,   // to make it rounded
    resizeMode: 'cover',
  },
});
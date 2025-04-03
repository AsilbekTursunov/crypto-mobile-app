import { CryptoData } from '@/types';
import { View, Text, Image, ImageProps, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import images from '@/constants/images';
import { convertLocal, convertFixed, sliceText } from '@/lib/utils/token';

const OrderCard = ({ order }: { order: CryptoData }) => { 
  return (
    <TouchableOpacity onPress={() => router.push({ pathname: '/coins/[id]', params: { id: order?.id } })} className={`w-full flex flex-row items-center justify-between gap-1 mb-4 relative  border-b border-b-bgDark py-3`} >
      <View className='flex flex-row gap-2'>
        <Image source={{ uri: order.image }} className='size-12 rounded-full  ' />
        <View className='flex flex-col gap-1'>
          <Text className='text-lg text-white font-JakartaBold '>{sliceText(order.name, 8)}</Text>
          <Text className='text-base text-textGray font-JakartaLight uppercase'>{order?.symbol}</Text>
        </View>
      </View>
      {order.market_cap_change_percentage_24h < 0 ? (
        <Image source={images.dicrease as ImageProps} className='w-44 h-10 ' resizeMode='contain' />
      ) : (
        <Image source={images.increase as ImageProps} className='w-44 h-10' resizeMode='contain' />
      )}
      <View className='flex flex-col items-end justify-end'>
        <Text className='text-lg  font-bold text-white'>${convertLocal(order?.current_price)}</Text>
        <Text className={`text-xs  flex  font-bold ${order.price_change_percentage_24h >= 0 ? 'text-textGreen' : 'text-textRed'}`}>{convertFixed(order.price_change_percentage_24h)}%</Text>
      </View>
    </TouchableOpacity>
  )
}

export default OrderCard
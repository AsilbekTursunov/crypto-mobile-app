import { View, Text } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
    <View className='w-full flex-1 bg-bgDark flex flex-col items-center justify-center'>
      <View>
        <View className='text-white border-2  animate-spin border-bgPrimary relative  size-32 rounded-full flex flex-row items-center justify-center'>
          <Text className=' absolute top-1/2 transform -translate-y-1/2 w-52 h-6 bg-bgDark '></Text>
          <Text className=' absolute left-1/2 transform -translate-x-1/2 w-6 h-52 bg-bgDark '></Text>
        </View>
      </View>
    </View>
  )
}

export default Loader
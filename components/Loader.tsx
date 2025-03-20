import { View, Text } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
    <View className='w-full flex-1 flex flex-col items-center justify-center bg-mainDark'>
      <View>
        <View className=' animate-spin border-4  border-dashed overflow-hidden  relative bg-transparent border-bgPrimary size-32 rounded-full flex flex-row items-center justify-center'> 
        </View>
      </View>
    </View>
  )
}

export default Loader
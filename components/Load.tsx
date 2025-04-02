import { StyleSheet, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
const ScreenLoader = () => {
  return (
    <View className='w-full h-screen bg-mainDark flex items-center justify-center'>
      <LottieView  style={styles.loader} source={require('../assets/icons/crypto-loader.json')} autoPlay loop />
    </View>
  )
} 
export default ScreenLoader

const styles = StyleSheet.create({ 
  loader: {
    width: 300,
    height: 500,
  },
}) 
import { ImageBackground, ImageProps } from 'react-native'
import React from 'react'
import { useChartStore } from '@/store'
import { CandlestickChart } from 'react-native-wagmi-charts'
import Loader from './Loader'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import images from '@/constants/images'
const CurrencyChart = () => {
  const { chart } = useChartStore()
  if (!chart) return <Loader />
  const data = chart ? chart.map(item => ({ timestamp: item[0], open: item[1], high: item[2], low: item[3], close: item[4] })) : []
  return (
    <ImageBackground
      className=""
      source={images.tableCross as ImageProps}
      resizeMode='repeat'
    >
      <GestureHandlerRootView className='overflow-hidden'>
        <CandlestickChart.Provider data={data}>
          <CandlestickChart className='border border-mainDark'>
            <CandlestickChart.Candles />
            <CandlestickChart.Crosshair>
              <CandlestickChart.Tooltip />
            </CandlestickChart.Crosshair>
          </CandlestickChart>
        </CandlestickChart.Provider>
      </GestureHandlerRootView>
    </ImageBackground>
  )
}

export default CurrencyChart
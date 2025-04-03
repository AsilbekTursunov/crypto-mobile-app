import React from 'react'
// import { Stack } from 'expo-router'
import CoinDetail from './[id]';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const CoinsStackNavigater = () => {
  return (
    <Drawer.Navigator id={undefined}>
      <Drawer.Screen name='[id]' options={{ headerShown: false }} component={CoinDetail} />
    </Drawer.Navigator>
  )
}

export default CoinsStackNavigater
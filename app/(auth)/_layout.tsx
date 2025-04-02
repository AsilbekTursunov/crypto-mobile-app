import React from 'react'
// import { Stack } from 'expo-router'  
import Authorization from './authorization';
import Welcome from './welcome';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
const AuthStackNavigater = () => {
  return (
    <Drawer.Navigator id={undefined}>
      <Drawer.Screen name='welcome' options={{ headerShown: false }} component={Authorization} />
      <Drawer.Screen name='authorization' options={{ headerShown: false }} component={Welcome} />
    </Drawer.Navigator>
  )
}

export default AuthStackNavigater
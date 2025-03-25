import { View, Text, ImageProps, Image } from 'react-native'
import React from 'react'
import { Redirect, Tabs } from 'expo-router'
import icons from '@/constants/icons';
import { useAuth } from '@clerk/clerk-expo';


const TabIcon = ({ color, focused, icon }: { color: string; focused: boolean; icon?: ImageProps }) => (
  <View style={{marginBottom:10}}>
    <Image source={icon} alt='tab-icon' className='size-10' tintColor={focused ? "#5ED5A8" : "#3E4750"} />
  </View>
)

const RootLaytout = () => { 
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#5ED5A8",
        tabBarInactiveTintColor: "#3E4750", 
        tabBarStyle: {
          backgroundColor: '#1B232A', 
          paddingTop: 10, 
          height:60,
          borderTopWidth: 0,
          borderTopColor: "#5ED5A8"
        }, 
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title:'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} focused={focused} icon={icons.home as ImageProps} />
        }}
      />
      <Tabs.Screen
        name='news'
        options={{
          title:'News',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} focused={focused} icon={icons.news as ImageProps} />
        }} /> 
    </Tabs>
  )
}

export default RootLaytout
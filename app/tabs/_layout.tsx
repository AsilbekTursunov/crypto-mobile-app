import { View, Text, ImageProps, Image } from 'react-native'
import React from 'react'
import icons from '@/constants/icons';
import { Tabs } from 'expo-router';
 
const TabIcon = ({ color, focused, icon }: { color: string; focused: boolean; icon?: ImageProps }) => (
  <View style={{ marginBottom: 10 }}>
    <Image source={icon} alt='tab-icon' className='size-8' tintColor={focused ? "#5ED5A8" : "#3E4750"} />
  </View>
)

const TabsStackNavigater = () => {
  return (
    <Tabs
      id={undefined}
      screenOptions={{
        tabBarActiveTintColor: "#5ED5A8",
        tabBarInactiveTintColor: "#3E4750",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#13191f',
          paddingTop: 15,
          height: 75,
          borderTopWidth: 0,  
          paddingHorizontal: 10,
          paddingVertical: 10,
        },
      }}
    >
      <Tabs.Screen
        name='home' 
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} focused={focused} icon={icons.home as ImageProps} />
        }}
      />
      <Tabs.Screen
        name='news' 
        options={{
          title: 'News',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} focused={focused} icon={icons.news as ImageProps} />
        }} />
    </Tabs>
  )
}

export default TabsStackNavigater
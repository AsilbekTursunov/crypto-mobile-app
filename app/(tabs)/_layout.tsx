import { View, Text, ImageProps, Image } from 'react-native'
import React from 'react'
import icons from '@/constants/icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './home';
import NewsScreen from './news';

const Tab = createBottomTabNavigator();
const TabIcon = ({ color, focused, icon }: { color: string; focused: boolean; icon?: ImageProps }) => (
  <View style={{ marginBottom: 10 }}>
    <Image source={icon} alt='tab-icon' className='size-8' tintColor={focused ? "#5ED5A8" : "#3E4750"} />
  </View>
)

const TabsStackNavigater = () => {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        tabBarActiveTintColor: "#5ED5A8",
        tabBarInactiveTintColor: "#3E4750",

        tabBarStyle: {
          backgroundColor: '#1B232A',
          paddingTop: 10,
          height: 64,
          borderTopWidth: 0,  
          paddingHorizontal: 10,
          paddingVertical: 10,
        },
      }}
    >
      <Tab.Screen
        name='home'
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} focused={focused} icon={icons.home as ImageProps} />
        }}
      />
      <Tab.Screen
        name='news'
        component={NewsScreen}
        options={{
          title: 'News',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon color={color} focused={focused} icon={icons.news as ImageProps} />
        }} />
    </Tab.Navigator>
  )
}

export default TabsStackNavigater
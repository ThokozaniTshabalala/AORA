import { View, Text, Image } from 'react-native';
import React from 'react'
import {Tabs, Redirect } from 'expo-router'; 
import { icons } from '../../constants';

const TabIcon =({icon, color, name, focused})=>{
 return (
  <View className="items-center justify-center gap-1" style={{ width: 60 }}>
    <Image 
    source = {icon}
    resizeMode="contain"
    className="w-5 h-5"
    style={{tintColor: focused ? '#FFA001' : color}}
    />

    <Text className ={`${focused ? 'font-psemibold' : 'font-pregular'} text-center`} 
    style={{ fontSize: 10, color: focused ? '#FFA001' : '#FFFFFF', marginBottom: -15 }}
    numberOfLines={1}>
      {name}

    </Text>
  </View>
 )
}

const TabsLayout = () => {
  return (
    <>
    <Tabs
     screenOptions={{
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#FFA001',
      tabBarInactiveTintColor: '#CDCDE0',
      tabBarStyle: {
        backgroundColor: '#161622',
        borderTopWidth: 1,
        borderTopColor: '#232533',

      }
     }}
    >
      <Tabs.Screen 
        name="home"
        options ={{
        itle: 'Home',
        headerShown: false,
        tabBarIcon: ({ color, focused}) => (
          <TabIcon 
           icon ={icons.home}
           name = "Home"
           focused={focused}
          />
        )
        }}
      />

<Tabs.Screen 
      name="bookmark"
      options ={{
        title: 'Bookmark',
        headerShown: false,
        tabBarIcon: ({ color, focused}) => (
          <TabIcon 
           icon ={icons.bookmark}
           name = "Bookmark"
           focused={focused}
          />
        )
      }}
      />

<Tabs.Screen 
      name="create"
      options ={{
        title: 'Create',
        headerShown: false,
        tabBarIcon: ({ color, focused}) => (
          <TabIcon 
           icon ={icons.plus}
           name = "Create"
           focused={focused}
          />
          
        )
      }}
      />

<Tabs.Screen 
        name="profile"
        options ={{
        itle: 'Profile',
        headerShown: false,
        tabBarIcon: ({ color, focused}) => (
          <TabIcon 
           icon ={icons.profile}
           name = "Profile"
           focused={focused}
          />
        )
        }}
      />
    </Tabs>
    </>
  )
}

export default TabsLayout
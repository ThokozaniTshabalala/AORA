import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './CustomButton'
import {router} from 'expo-router'
const EmptyState = ({title, subtitle}) => {
  return (
    <View className="justify-center items-center px-4 ">
      <Image 
      source={images.empty}
      className="w-[188px] h-[150px]"
      resizeMode='contain'
      />

      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
      <Text className="text-2xl font-psemibold text-white pb-5">{title}</Text>

    <CustomButton 
    title="Create video"
    handlePress={() => router.push('/create')}
    containerStyles="w-full"
    />
    </View>
  )
}

export default EmptyState
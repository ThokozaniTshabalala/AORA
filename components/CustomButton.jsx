import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity
    onPress={handlePress}
    activeOpacity={0.7}
    style={{ backgroundColor: "orange", borderRadius: 10, height: 56, justifyContent: "center", alignItems: "center" }}
    className ={`${containerStyles} ${isLoading ? opacity-50 : ''}`}
    disabled={isLoading}>
    <Text className={`text-black-blackish font-psemibold text-lg ${textStyles}`}>{title}</Text>
  </TouchableOpacity>
 
  )
}

export default CustomButton
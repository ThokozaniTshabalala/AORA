import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (

      <View
        style={{
          borderWidth: 1,
          borderColor: isFocused ? '#FFA500' : '#191a30',
          width: '100%',
          height: 60,
          paddingHorizontal: 16,
          backgroundColor: '#191a30',
          borderRadius: 15,
          justifyContent: 'center',
          marginTop: 7,
          flexDirection: 'row',
          alignItems: 'center', // Ensure vertical alignment
        }}
        className="space-x-4"
      >
        <TextInput
          className="text-base mt-0.5 text-white flex-1 font-pregular"
          value={value}
          placeholder="Search for a video topic"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          style={{ color: '#fff', flex: 1 }}
          placeholderTextColor="#b0b0b0"
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />

       <TouchableOpacity>
        <Image 
        source={icons.search}
        className='w-5 h-5'
        resizeMode='contain'
        />
        </TouchableOpacity> 
      </View>
  );
};

export default SearchInput;
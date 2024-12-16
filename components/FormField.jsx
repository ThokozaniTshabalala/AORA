import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import {icons} from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  // State to track focus
  const [isFocused, setIsFocused] = useState(false);

   // State to track whether the password is visible or not
   const [showPassword, setShowPassword] = useState(false);


  // Handle focus and blur events
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View className={`w-full p-3 ${otherStyles}`}>
      <Text className="text-white text-base mb-2">
        {title}
      </Text>

      <View
        style={{
          borderWidth: 1,              // border-2
          borderColor: isFocused ? '#FFA500' : '#191a30', // Orange when focused, dark color otherwise
          width: '100%',               // w-full
          height: 60,                  // h-16 (16 * 4)
          paddingHorizontal: 16,       // px-4
          backgroundColor: '#191a30',  // bg-black-100 (dark gray/black background)
          borderRadius: 15,            // rounded-2xl (adjusted to 15 for smooth corners)
          justifyContent: 'center',    // items-center (aligns children vertically)
          marginTop: 7,
          flexDirection: 'row',
        }}
      >
        <TextInput
          value={value}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          style={{ color: '#fff', flex: 1 }} // Adjust text style
          placeholderTextColor="#b0b0b0"  // Placeholder color
          secureTextEntry={title === 'Password' && !showPassword}
        />

      {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
               source={showPassword ? icons.eyehide : icons.eye}
               style={{ width: 24, height: 24, resizeMode: 'contain', top: 15 }}
            />
          </TouchableOpacity>
      )}    
      </View>
    </View>
  );
};

export default FormField;

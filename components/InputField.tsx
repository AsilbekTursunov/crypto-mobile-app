import { View, Text, TouchableWithoutFeedback, TextInput, Keyboard, TextInputProps, KeyboardAvoidingView, Platform, ImageProps, Image } from 'react-native'
import React, { useState } from 'react'

interface InputField extends TextInputProps {
  value: string;
  label?: string;
  onChangeText: (value: string) => void; 
  icon?: ImageProps;
  props?: object; // Made 'props' optional
  secureTextEntry?: boolean,
  wrapperStyle?: string; // Made 'className' optional
  labelStyle?: string,
  inputStyle?: string, 
}

const InputField = ({ onChangeText, value, placeholder, props, label, icon, secureTextEntry, wrapperStyle, inputStyle, labelStyle }: InputField) => {
  const [watch, setWatch] = useState(secureTextEntry)
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className={`flex flex-col gap-1`}>
          {label && <Text className={`text-sm text-textBlue font-JakartaLight ${labelStyle}`}>{label}</Text>}
          <View className={`w-full bg-[#161C22] relative rounded-xl  ${wrapperStyle}`}>
            <TextInput
              value={value}
              {...props}
              onChangeText={onChangeText} 
              className={` w-full h-14  px-4 text-textGray ${inputStyle}`} />
            {icon && <Image source={icon as ImageProps} className='absolute  top-1/2 transform -translate-y-1/2 right-2 w-6 h-6' />}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default InputField
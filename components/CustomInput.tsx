import { View, Text, TouchableWithoutFeedback, TextInput, Keyboard, TextInputProps, KeyboardAvoidingView, Platform, ImageProps, Image, TouchableOpacity } from 'react-native'
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

const CustomInput = ({ onChangeText, value, placeholder, props, label, icon, secureTextEntry, wrapperStyle, inputStyle, labelStyle }: InputField) => {
  const [watch, setWatch] = useState(secureTextEntry)
  return (
    <KeyboardAvoidingView
      className='w-full'
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className={`flex flex-col gap-1 w-full`}>
          {label && <Text className={` text-textBlue font-JakartaLight ${labelStyle}`}>{label}</Text>}
          <View className={`w-full  relative  ${wrapperStyle}`}>
            <TextInput
              value={value}
              {...props}
              secureTextEntry={watch}
              onChangeText={onChangeText}
              className={` w-full border-b border-b-textGray/10 h-14 text-textGray ${inputStyle}`} />
            {secureTextEntry && <TouchableOpacity onPress={() => setWatch(!watch)} className='absolute right-5 top-1/2 transform -translate-y-1/2'>
              <Text className='text-textGray font-JakartaLight text-sm'>{watch ? 'Show' : 'Hide'}</Text>
            </TouchableOpacity>}
            {icon && <Image source={icon as ImageProps} className='absolute  top-1/2 transform -translate-y-1/2 right-2 w-6 h-6' />}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default CustomInput
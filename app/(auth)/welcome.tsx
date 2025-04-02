import { View, Text, TouchableOpacity, Image, ImageProps, StatusBar, ImageBackground } from 'react-native'
import React, { useRef, useState } from 'react' 
import { router } from 'expo-router';
import Swiper from 'react-native-swiper';
import { banners } from '@/constants'; 
import images from '@/constants/images';

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === banners.length - 1; 
  
  return (
    <ImageBackground
      className="flex h-screen w-full flex-1  flex-col items-center justify-center "
      source={images.background as ImageProps}
      resizeMode='cover'
    >
      <View className='w-full h-[750px] mt-5 '>
        <Swiper
          ref={swiperRef}  
          autoplayTimeout={5}
          activeDotColor='#777777'
          dotColor='#252E35'
          onIndexChanged={(index) => setActiveIndex(index)}
        >
          {banners.map((item) => (
            <View key={item.id} className="">
              <Image
                source={item.bgImage as ImageProps}
                className="w-full h-[350px] mt-20"
                resizeMode="contain"
              />
              <View className="flex flex-row items-center justify-center w-full mt-40">
                <Text className="text-white text-3xl mx-10 text-center">
                  {item.title}
                </Text>
              </View>
              <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
                {item.description}
              </Text>
            </View>
          ))}
        </Swiper>
      </View>

      <TouchableOpacity
        onPress={() => isLastSlide ? router.push("/(auth)/authorization") : swiperRef.current?.scrollBy(1)}
        className="w-fit mb-10 px-20 py-4 rounded-lg text-primary bg-bgPrimary"
      >
        <Text>{isLastSlide ? "Get Started" : "Next"}</Text>
      </TouchableOpacity> 
      <StatusBar barStyle="light-content" hidden />
    </ImageBackground>
  );
};

export default Welcome;
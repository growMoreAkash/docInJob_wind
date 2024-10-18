import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
    const navigation = useNavigation();
    return (
        <View className="absolute top-0 left-0 right-0 pt-9 px-5 pb-5 h-auto flex-row items-center z-10 border-b flex justify-between border-gray-300 bg-white ">
            <View className="ml-4">
                <Pressable onPress={() => navigation.navigate('Home')}>
                <Image source={require('./img/Logo.png')} className="w-[150] h-20" resizeMode="contain" />
                </Pressable>
            </View>
            <Pressable onPress={() => navigation.navigate('Signup')}
                className="w-auto px-3 h-12 bg-purple-800 rounded-lg justify-center items-center">
                <Text className="text-white text-lg ">Sign in | Sign up</Text>
            </Pressable>
        </View>
    );
};

export default Navbar;

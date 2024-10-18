import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Footer() {
    const navigation = useNavigation();
    return (
        <View className="absolute bottom-0 left-0 right-0 h-auto pb-3 bg-gray-300 justify-evenly items-center z-10 py-5 flex flex-row ">
            <Pressable className="items-center mx-[-15]" onPress={()=>navigation.navigate('Home')}>
                <Image source={require('./img/Home-Icon.png')} className=" h-7 mb-2" resizeMode="contain" />
                <Text className="text-purple-500 text-center text-md  px-1">Home</Text>
            </Pressable>
            <Pressable className="items-center mx-[-15]" onPress={()=>navigation.navigate('About')}>
                <Image source={require('./img/About-Icon.png')} className=" h-7 mb-2" resizeMode="contain" />
                <Text className="text-purple-500 text-center text-md  px-1">About</Text>
            </Pressable>
            <Pressable className="items-center mx-[-15]" onPress={()=>navigation.navigate('About')}>
                <Image source={require('./img/Session-Icon.png')} className=" h-7 mb-2" resizeMode="contain" />
                <Text className="text-purple-500 text-center text-md  px-1">Session</Text>
            </Pressable>
            <Pressable className="items-center mx-[-15]" onPress={()=>navigation.navigate('About')}>
                <Image source={require('./img/Test-Icon.png')} className=" h-7 mb-2" resizeMode="contain" />
                <Text className="text-purple-500 text-center text-md  px-1">Test</Text>
            </Pressable>
            <Pressable className="items-center mx-[-15]" onPress={()=>navigation.navigate('About')}>
                <Image source={require('./img/Surgery--Icon.png')} className=" h-7 mb-2" resizeMode="contain" />
                <Text className="text-purple-500 text-center text-md  px-1">Surgery</Text>
            </Pressable>
            <Pressable className="items-center mx-[-15]" onPress={()=>navigation.navigate('About')}>
                <Image source={require('./img/Medicine--Icon.png')} className=" h-7 mb-2" resizeMode="contain" />
                <Text className="text-purple-500 text-center text-md  px-1">Medicine</Text>
            </Pressable>
        </View>
    )
}
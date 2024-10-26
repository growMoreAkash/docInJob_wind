import { View, Text, TextInput, Pressable, Image, ScrollView } from 'react-native';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Sec3 = () => {
    const navigation = useNavigation();
    return (
        <View className="mt-5 w-[100%] pt-5 flex-row my-5 py-5 mb-2 justify-evenly">
            <View className="items-center mx-[-25]">
                <Image source={require('../../img/Lab-Test-Icon.png')} className="w-[150px] h-20" resizeMode="contain" />

                <Pressable className="h-12 mt-6  border-[1px] border-gray-500 rounded-lg justify-center items-center" onPress={() => navigation.navigate('Comming')}>
                    <Text className="text-orange-500 text-center text-md font-semibold w-[100] px-1">Book Lab Test</Text>
                </Pressable>
            </View>

            <View className="items-center mx-[-25]">
                <Image source={require('../../img/Medicine-Icon.png')} className="w-[150px] h-20" resizeMode="contain" />
                <Pressable className="h-12 mt-6  border-[1px] border-gray-500 rounded-lg justify-center items-center" onPress={() => navigation.navigate('Comming')}>
                    <Text className="text-orange-500 text-center text-md font-semibold w-[100] px-1">BUY MEDICINE</Text>
                </Pressable>
            </View>
            <View className="items-center mx-[-25]">
                <Image source={require('../../img/Surgery-Icon.png')} className="w-[150px] h-20" resizeMode="contain" />
                <Pressable className="h-12 mt-6  border-[1px] border-gray-500 rounded-lg justify-center items-center" onPress={() => navigation.navigate('Comming')}>
                    <Text className="text-orange-500 text-center text-md font-semibold w-[100] px-1">SURGERY ASSISTANCE</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Sec3
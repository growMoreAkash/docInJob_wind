import { View, Text, TextInput, Pressable, Image, ScrollView } from 'react-native';
import React from 'react'

const Sec2 = () => {
    return (
        <View className="bg-slate-200 mt-5 w-[100%] pt-5">
            <Text className="text-center text-3xl font-semibold text-purple-800 px-4">
                Search Doctors By Speciality
            </Text>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="flex-row my-5 py-5">
                <View className="items-center mx-[-25] ml-[1]">
                    <Image source={require('.././img/Cardiologist-Icon.png')} className="w-[150px] h-20" resizeMode="contain" />

                    <Text className="text-center mt-2">Cardiologist</Text>
                </View>
                <View className="items-center mx-[-25]">
                    <Image source={require('.././img/Neurology-Icon.png')} className="w-[150px] h-20" resizeMode="contain" />
                    <Text className="text-center mt-2">Neurologist</Text>
                </View>
                <View className="items-center mx-[-25]">
                    <Image source={require('.././img/Dentist-Icon.png')} className="w-[150px] h-20" resizeMode="contain" />
                    <Text className="text-center mt-2">Dentist</Text>
                </View>
                <View className="items-center mx-[-25]">
                    <Image source={require('.././img/General-Physician-Icon.png')} className="w-[150px] h-20" resizeMode="contain" />
                    <Text className="text-center mt-2">General Physician</Text>
                </View>
                <View className="items-center mx-[-25]">
                    <Image source={require('.././img/Orthopedic-Icon.png')} className="w-[150px] h-20" resizeMode="contain" />
                    <Text className="text-center mt-2">Orthopedic</Text>
                </View>
                <View className="items-center mx-[-25]">
                    <Image source={require('.././img/Urology-Icon.png')} className="w-[150px] h-20" resizeMode="contain" />
                    <Text className="text-center mt-2">Urology</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default Sec2
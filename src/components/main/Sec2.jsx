import { View, Text, TextInput, Pressable, Image, ScrollView } from 'react-native';
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const Sec2 = ({ setSearch }) => {
    const navigation = useNavigation()
    return (
        <View className="bg-slate-200 mt-5 w-[100%] pt-5">
            <Text className="text-center text-3xl font-semibold text-purple-800 px-4">
                Search Doctors By Speciality
            </Text>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="flex-row my-5 py-5">
                <Pressable className="items-center mx-[-25] ml-[1]" onPress={()=> { setSearch('Cardiologist'); navigation.navigate('Doctor'); }}>
                    <Image source={require('../../img/Cardiologist-Icon.png')} className="w-[150px] h-20" resizeMode="contain" />
                    <Text className="text-center mt-2">Cardiologist</Text>
                </Pressable>
                <Pressable className="items-center mx-[-25] ml-[1]" onPress={()=> { setSearch('Neurologist'); navigation.navigate('Doctor'); }}>
                    <Image source={require('../../img/Neurology-Icon.png')} className="w-[150px] h-20" resizeMode="contain" />
                    <Text className="text-center mt-2">Neurologist</Text>
                </Pressable>
                <Pressable className="items-center mx-[-25] ml-[1]" onPress={()=> { setSearch('Dentist'); navigation.navigate('Doctor'); }}>
                    <Image source={require('../../img/Dentist-Icon.png')} className="w-[150px] h-20" resizeMode="contain" />
                    <Text className="text-center mt-2">Dentist</Text>
                </Pressable>
                <Pressable className="items-center mx-[-25] ml-[1]" onPress={()=> { setSearch('General Physician'); navigation.navigate('Doctor'); }}>
                    <Image source={require('../../img/General-Physician-Icon.png')} className="w-[150px] h-20" resizeMode="contain" />
                    <Text className="text-center mt-2">General Physician</Text>
                </Pressable>
                <Pressable className="items-center mx-[-25] ml-[1]" onPress={()=> { setSearch('Orthopedic'); navigation.navigate('Doctor'); }}>
                    <Image source={require('../../img/Orthopedic-Icon.png')} className="w-[150px] h-20" resizeMode="contain" />
                    <Text className="text-center mt-2">Orthopedic</Text>
                </Pressable>
                <Pressable className="items-center mx-[-25] ml-[1]" onPress={()=> { setSearch('Urology'); navigation.navigate('Doctor'); }}>
                    <Image source={require('../../img/Urology-Icon.png')} className="w-[150px] h-20" resizeMode="contain" />
                    <Text className="text-center mt-2">Urology</Text>
                </Pressable>
            </ScrollView>
        </View>
    )
}

export default Sec2
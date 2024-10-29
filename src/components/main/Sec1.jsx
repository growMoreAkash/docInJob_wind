import { View, Text, TextInput, Pressable, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

const Sec1 = ({ setSearch, search, setCityIndex, cities, specialities, cityIndex }) => {
    const navigation = useNavigation();

    const submit = () => {
        // Validate inputs
        if (cities[cityIndex].trim() === "" || search.trim() === "") {
            Alert.alert("Error", "Both fields are required!");
            return;
        }
        navigation.navigate('Doctor')
    };

    return (
        <>
            <Text className="text-[24px] mx-3 px-10 text-center mb-4 text-purple-800 font-semibold">
                Book an appointment with your doctor
            </Text>
            <View className="flex-row items-center w-11/12 h-12 px-4 bg-gray-100 border-[1px] border-orange-500 rounded-lg">
                <Image
                    source={require('../../img/Location-Icon.png')}
                    className="w-6 h-6 mr-2"
                    resizeMode="contain"
                />
                <TextInput
                    placeholder="Find Location..."
                    value={cities[cityIndex]}
                    onChangeText={(text) => setCityIndex(cities.indexOf(text) ?? 0)}
                    className="flex-1 text-base"
                />
            </View>
            <View className="flex-row items-center w-11/12 h-12 px-4 mt-4 bg-gray-100 border-[1px] border-orange-500 rounded-lg">
                <Image
                    source={require('../../img/Search-Icon.png')}
                    className="w-6 h-6 mr-2"
                    resizeMode="contain"
                />
                <TextInput
                    placeholder="Search Doctor, Speciality etc..."
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                    className="flex-1 text-base"
                />
            </View>

            <Pressable
                onPress={submit}
                className="w-11/12 h-12 mt-6 bg-purple-800 rounded-lg justify-center items-center"
            >
                <Text className="text-white text-lg font-semibold">Submit</Text>
            </Pressable>
        </>
    );
};

export default Sec1;

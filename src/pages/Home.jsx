import { View, Text, TextInput, Pressable, Image, ScrollView } from 'react-native';
import React from 'react';
import Sec1 from '../components/main/Sec1';
import Sec2 from '../components/main/Sec2';
import Sec3 from '../components/main/Sec3';

const Home = ({ route }) => {
    const { setCityIndex, cities, specialities, cityIndex } = route.params;

    return (
        <>
            <ScrollView className="flex-1 mt-[60px] mb-16">
                <View className="justify-start items-center">
                    <Sec1 setCityIndex={setCityIndex} cities={cities} specialities={specialities} cityIndex={cityIndex} />

                    <Sec2 />

                    <Sec3 />

                    <View>
                        <Image source={require('../img/Bottom-Image.png')} className="h-[250]" resizeMode="contain" />
                    </View>

                </View>
            </ScrollView>
        </>

    );
};

export default Home;

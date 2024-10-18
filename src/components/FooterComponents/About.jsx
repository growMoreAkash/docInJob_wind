import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'

const About = () => {
    return (
        <ScrollView className="flex-1 mt-[60px] mb-16 ">
            <View className="justify-center items-center">
                <Text className="text-2xl w-[250px] text-center text-purple-800 font-semibold">Quality healthcare made easy</Text>

                <Text className="text-center mx-7 mt-5 text-lg text-gray-600">
                    Our Mission : DocInJob is on a mission to make quality
                    healthcare affordable and accessible for over a
                    4 Lakhs + Indians. We believe in empowering our users
                    with the most accurate, comprehensive, and curated
                    information and care, enabling them to make better
                    healthcare decisions.

                </Text>
                <Text className="text-center mx-7 mt-5 text-lg text-gray-600">
                    Health is a habit :
                    It is the journey that takes you to new destinations
                    every day with endless possibilities of life on the back
                    of happiness, energy, and hope. DocInJob wants to
                    make this journey easy for every Indian and help them
                    live healthier and longer lives.
                </Text>
                <View>
                    <Image source={require('../img/about-us-image.png')} className="h-[250]" resizeMode="contain" />
                </View>
            </View>

        </ScrollView>
    )
}

export default About
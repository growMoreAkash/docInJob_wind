import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import DropdownMenu from './DropdownMenu';
import { Logout } from '../api/api';

const Navbar = ({ user, getUser }) => {
    const navigation = useNavigation();

    const handleSelect = (option) => {
        if (option === 'Profile') {
            navigation.navigate('User');
        } else if (option === 'Appointments') {
            navigation.navigate('Appointments');
        } else if (option === 'Logout') {
            Logout();
            getUser();
        }
    }

    return (
        <View className="absolute top-0 left-0 right-0 mt-5 pt-4 px-4 pb-2 h-auto flex-row items-start z-10 border-b flex justify-between border-gray-300 bg-white ">
            <View className="ml-4">
                <Pressable onPress={() => navigation.navigate('Home')}>
                    <Image source={require('../img/Logo.png')} className="w-[150] h-20" resizeMode="contain" />
                </Pressable>
            </View>
            {user ? (<DropdownMenu display={<Text className="text-lg text-right p-3">{user.name}</Text>} options={['Profile', 'Appointments', 'Logout']} onSelect={handleSelect} />) : (<Pressable onPress={() => navigation.navigate('User')}
                className="w-auto px-3 h-12 bg-purple-800 rounded-lg justify-center items-center">
                <Text className="text-white text-lg ">Sign in | Sign up</Text>
            </Pressable>)}
        </View>
    );
};

export default Navbar;

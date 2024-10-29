import { View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { GetOtp, Login } from '../api/api';

const User = ({ user, getUser }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const navigation = useNavigation();

    const sendOtp = () => {
        if (phoneNumber) {
            GetOtp({ phone: `+91${phoneNumber}` });
            setOtpSent(true);
            alert('OTP sent to ' + phoneNumber);
        } else {
            alert('Please enter a valid phone number.');
        }
    };

    const submitForm = async () => {
        if (otp && phoneNumber) {
            await Login({ phone: `+91${phoneNumber}`, otp: otp });
            getUser();
        } else {
            alert('Please enter the OTP.');
        }
    };

    return (
        <View className='flex-1 items-center mt-[20%] px-4'>
            {user ? (<View>
                <Text className='text-2xl font-bold mb-8 text-purple-800'>Welcome, {user.name}</Text>
                <Text className='text-lg font-medium mb-4'>Age: {user.age}</Text>
                <Text className='text-lg font-medium'>Gender: {user.gender}</Text>
                <Text className='text-lg font-medium'>Address: {user.address}</Text>
                <Pressable className='bg-purple-800 p-2 rounded-lg mt-8' onPress={() => navigation.navigate('Appointments')}>
                    <Text className='text-white text-center text-lg'>Your Appointments</Text>
                </Pressable>
            </View>) : (<View>
                <Text className='text-2xl font-bold mb-8 text-purple-800'>Sign Up</Text>

                {/* Phone Number Input with Country Code */}
                <View className="flex-row items-center w-11/12 h-12 bg-gray-100 border-[1px] border-orange-500 rounded-lg mb-4">
                    {/* Fixed Country Code Section */}
                    <View className="w-16 items-center justify-center border-r border-orange-500">
                        <Text className='text-base font-medium'>+91</Text>
                    </View>
                    <TextInput
                        className='flex-1 text-base pl-2'
                        placeholder="Enter Phone Number"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                </View>

                {/* OTP Input (shown after sending OTP) */}
                {otpSent && (
                    <View className="flex-row items-center w-11/12 h-12 px-4 bg-gray-100 border-[1px] border-orange-500 rounded-lg mb-4">
                        <TextInput
                            className='flex-1 text-base'
                            placeholder="Enter OTP"
                            keyboardType="numeric"
                            value={otp}
                            onChangeText={setOtp}
                        />
                    </View>
                )}

                {/* Send OTP Button */}
                {!otpSent && (
                    <Pressable
                        className='bg-purple-800 py-3 rounded-lg mb-4'
                        onPress={sendOtp}
                    >
                        <Text className='text-white text-center text-lg'>Send OTP</Text>
                    </Pressable>
                )}

                {/* Submit Button (shown after sending OTP) */}
                {otpSent && (
                    <Pressable
                        className='w-11/12 bg-purple-800 py-3 rounded-lg'
                        onPress={submitForm}
                    >
                        <Text className='text-white text-center text-lg'>Submit</Text>
                    </Pressable>
                )}
            </View>)}
        </View>
    );
};

export default User;

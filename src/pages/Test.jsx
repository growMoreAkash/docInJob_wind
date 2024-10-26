import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, TextInput, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styled } from 'nativewind';

const StyledButton = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledInput = styled(TextInput);

const Test = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [patientName, setPatientName] = useState('');
    const [age, setAge] = useState('');
    const [additionalText, setAdditionalText] = useState('');

    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'We need camera roll permissions to make this work!');
        }
    };

    useEffect(() => {
        requestPermission();
    }, []);

    const uploadPhoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        console.log(result);
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    useEffect(() => {
        console.log('Selected Image:', selectedImage);
    }, [selectedImage]);

    const handleSubmit = () => {
        // You can handle form submission here
        console.log({
            patientName,
            age,
            additionalText,
            selectedImage,
        });

        // You can clear the form after submission if needed
        setPatientName('');
        setAge('');
        setAdditionalText('');
        setSelectedImage(null);
    };

    return (
        <ScrollView>
            <View className="flex-1 mb-[25%] items-center mt-[15%] p-4">
                <Image source={require('.././img/Book-Test-Main-Image.png')} className="h-32 mb-2" resizeMode="contain" />
                <StyledText className="text-2xl font-semibold text-purple-800 mb-4">Upload Prescription</StyledText>

                <StyledButton
                    className="bg-orange-600 p-4 rounded-lg mb-4"
                    onPress={uploadPhoto}
                >
                    <StyledText className="text-white">
                        {selectedImage ? 'Reupload Prescription' : 'Upload Prescription'}
                    </StyledText>
                </StyledButton>

                {selectedImage && (
                    <Image
                        source={{ uri: selectedImage }}
                        className="w-64 h-64 rounded-lg mb-4"
                        resizeMode="cover"
                    />
                )}

                {/* Form */}
                <StyledInput
                    placeholder="Patient Name"
                    value={patientName}
                    onChangeText={setPatientName}
                    className="border border-orange-600 rounded p-2 mb-4 w-full"
                />
                <StyledInput
                    placeholder="Age"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                    className="border border-orange-600 rounded p-2 mb-4 w-full"
                />
                <StyledInput
                    placeholder="Additional Notes"
                    value={additionalText}
                    onChangeText={setAdditionalText}
                    multiline
                    className="border border-orange-600 rounded p-2 mb-4 w-full h-24"
                />
                <StyledButton
                    className="bg-purple-800 p-3 rounded-lg mb-4"
                    onPress={handleSubmit}
                >
                    <StyledText className="text-white text-xl px-4">Submit</StyledText>
                </StyledButton>
            </View>
        </ScrollView>

    );
};

export default Test;

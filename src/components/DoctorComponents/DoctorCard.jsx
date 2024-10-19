import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For icons
import { styled } from 'nativewind';

// Styling components with NativeWind
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const Doctor = () => {
    const [filters, setFilters] = useState({
        city: 'horibol',
        speciality: '',
        experience: 'Above 5 Years',
        fee: 'Below 500',
        gender: 'Male',
    });
    const [modalVisible, setModalVisible] = useState({ key: '', visible: false });

    const dropdownData = {
        experience: ['Above 5 Years', 'Above 10 Years', 'Above 20 Years'],
        fee: ['Below 500', 'Below 1000', 'Below 1500', 'Below 2000'],
        gender: ['Any', 'Male', 'Female'],
    };

    const doctor = {
        name: 'Dr. P. C. Sarma',
        speciality: 'Cardiologist',
        city: 'Silchar',
        experience: 25,
        hospital: 'Valley Hospital',
    };

    const renderDropdown = (key) => (
        <Modal
            transparent
            visible={modalVisible.key === key && modalVisible.visible}
            onRequestClose={() => setModalVisible({ key: '', visible: false })}
        >
            <StyledTouchableOpacity
                className="flex-1 bg-black/50 justify-center items-center"
                onPress={() => setModalVisible({ key: '', visible: false })}
            >
                <StyledView className="bg-white rounded-lg w-48 max-h-48">
                    <FlatList
                        data={dropdownData[key]}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <StyledTouchableOpacity
                                className="p-3 border-b border-orange-500"
                                onPress={() => {
                                    setFilters({ ...filters, [key]: item });
                                    setModalVisible({ key: '', visible: false });
                                }}
                            >
                                <StyledText>{item}</StyledText>
                            </StyledTouchableOpacity>
                        )}
                    />
                </StyledView>
            </StyledTouchableOpacity>
        </Modal>
    );

    return (
        <StyledView className="flex-1 p-4 mt-16">
            {/* Search Bar Section */}
            <StyledView className="flex-row justify-between mb-4">
                <StyledTextInput
                    className="border border-orange-500 rounded-lg p-2 flex-1 mr-2"
                    value={filters.city}
                    onChangeText={(text) => setFilters({ ...filters, city: text })}
                    placeholder="Search City"
                />
                <StyledTextInput
                    className="border border-orange-500 rounded-lg p-2 flex-1"
                    value={filters.speciality}
                    onChangeText={(text) => setFilters({ ...filters, speciality: text })}
                    placeholder="Search Speciality"
                />
            </StyledView>

            {/* Filters Section */}
            <StyledView className="flex-row justify-evenly mb-4">
                {Object.keys(dropdownData).map((key) => (
                    <StyledTouchableOpacity
                        key={key}
                        className="p-2 border border-orange-500 rounded-lg min-w-[100px] "
                        onPress={() => setModalVisible({ key, visible: true })}
                    >
                        {/* <Text className="text-start">hhj</Text> */}
                        <StyledText className='text-center'>{filters[key] || key.charAt(0).toUpperCase() + key.slice(1)}</StyledText>
                    </StyledTouchableOpacity>
                ))}
            </StyledView>

            {/* Doctor Card */}
            <StyledView className="border border-orange-500 rounded-lg p-4 bg-white items-center">
                <StyledView className="w-24 h-24 bg-gray-300 rounded-full justify-center items-center mb-4">
                    <FontAwesome name="user-md" size={50} color="black" />
                </StyledView>
                <StyledText className="text-lg font-bold text-purple-800 mb-2">{doctor.name}</StyledText>
                <StyledText className="text-sm text-blue-500 mb-2">{doctor.speciality}</StyledText>
                <StyledView className="flex-row items-center mb-1">
                    <FontAwesome name="map-marker" size={14} color="black" />
                    <StyledText className="text-sm ml-2">{doctor.city}</StyledText>
                </StyledView>
                <StyledView className="flex-row items-center mb-1">
                    <FontAwesome name="clock-o" size={14} color="black" />
                    <StyledText className="text-sm ml-2">Exp: {doctor.experience} Yrs</StyledText>
                </StyledView>
                <StyledView className="flex-row items-center">
                    <FontAwesome name="hospital-o" size={14} color="black" />
                    <StyledText className="text-sm ml-2">{doctor.hospital}</StyledText>
                </StyledView>
            </StyledView>

            {/* Render Dropdown Modals */}
            {Object.keys(dropdownData).map((key) => renderDropdown(key))}
        </StyledView>
    );
};

export default Doctor;

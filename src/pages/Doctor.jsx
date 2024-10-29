import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
import { styled } from 'nativewind';
import { GetSearch } from '../api/api';
import DoctorCard from '../components/DoctorComponents/DoctorCard.jsx';
import BookDoctor from '../components/DoctorComponents/BookDoctor.jsx';

// Styling components with NativeWind
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const Doctor = ({ route }) => {
    const { user, setCityIndex, cities, cityIndex, specialities } = route.params;
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [shown, setShown] = useState(0);
    const [total, setTotal] = useState(0);
    const [results, setResults] = useState([]);
    const [newResults, setNewResults] = useState([]);
    const [filters, setFilters] = useState({
        city: cities[cityIndex] ?? '',
        speciality: '',
        experience: '5',
        fee: '',
        gender: '',
        docSpe: '',
    });
    const [modalVisible, setModalVisible] = useState({ key: '', visible: false });
    const dropdownData = {
        experience: [['Above 5 Years', '5'], ['Above 10 Years', '10'], ['Above 15 Years', '15'], ['Above 20 Years', '20']],
        fee: [['Below 500', '500'], ['Below 1000', '1000'], ['Below 1500', '1500'], ['Below 2000', '2000'], ['Any', '']],
        gender: [['Any', ''], ['Male', 'male'], ['Female', 'female']],
    };

    useEffect(() => {
        if (newResults) {
            var totalResults = [];
            if (page === 1)
                totalResults = newResults;
            else
                totalResults = results.concat(newResults)
            setNewResults(null);
            setResults(totalResults);
        }
        setShown(results.length);
    }, [results, newResults, setResults, setShown, page]);

    useEffect(() => {
        const Search = async () => {
            var data = {};
            data.page = page;
            if (filters.city.trim()) data.city = filters.city;
            if (filters.speciality.trim()) data.speciality = filters.speciality;
            if (filters.docSpe.trim()) data.docSpe = filters.docSpe;
            if (filters.experience.trim()) data.experience = parseInt(filters.experience);
            if (filters.gender.trim()) data.gender = filters.gender;
            if (filters.fee.trim()) data.fee = parseInt(filters.fee);

            var response = await GetSearch({ data: data })

            if (page !== response.currentPage)
                setPage(response.currentPage);
            setNewResults(response.results);
            setPages(response.totalPages);
            setTotal(response.totalResults);
        };

        setCityIndex(cities.indexOf(filters.city));
        Search();
    }, [filters, page, setPage, setPages, setTotal]);

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
                        keyExtractor={(item) => item[0]}
                        renderItem={({ item }) => (
                            <StyledTouchableOpacity
                                className="p-3 border-b border-orange-500"
                                onPress={() => {
                                    setFilters({ ...filters, [key]: item[1] });
                                    setModalVisible({ key: '', visible: false });
                                }}
                            >
                                <StyledText>{item[0]}</StyledText>
                            </StyledTouchableOpacity>
                        )}
                    />
                </StyledView>
            </StyledTouchableOpacity>
        </Modal>
    );

    const renderDoctor = (key, doctor) => (
        <Modal
            transparent
            visible={modalVisible.key === key && modalVisible.visible}
            onRequestClose={() => setModalVisible({ key: '', visible: false })}
        >
            <StyledView className="flex-1 bg-black/50 justify-center items-center">
                <StyledView className="bg-white px-3 py-2">
                    <StyledView className="flex-row justify-between items-center">
                        <StyledText className="text-lg font-semibold">Book Appointment</StyledText>
                        <StyledTouchableOpacity onPress={() => setModalVisible({ key: '', visible: false })}>
                            <StyledText>Close</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                    <DoctorCard doctor={doctor} />
                    <BookDoctor doctor={doctor} user={user} />
                </StyledView>
            </StyledView>
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

            {/* Results Section */}
            <StyledText className="text-lg font-semibold text-purple-800 mb-2">
                Showing {shown} of {total} Results
            </StyledText>
            <FlatList
                data={results}
                keyExtractor={(item) => `${item.clinicId}${item.doctorId}`}
                renderItem={({ item }) =>
                    <StyledTouchableOpacity
                        onPress={() => setModalVisible({ key: `${item.clinicId}${item.doctorId}`, visible: true })}
                    >
                        <DoctorCard doctor={item} />
                    </StyledTouchableOpacity>
                }
            />
            {page < pages && (
                <StyledTouchableOpacity
                    className="bg-purple-800 p-2 rounded-lg mt-4"
                    onPress={() => setPage(page + 1)}
                >
                    <StyledText className="text-white">Load More</StyledText>
                </StyledTouchableOpacity>
            )}

            {/* Render Doctor Modals */}
            {results.map((doctor) => renderDoctor(`${doctor.clinicId}${doctor.doctorId}`, doctor))}

            {/* Render Dropdown Modals */}
            {Object.keys(dropdownData).map((key) => renderDropdown(key))}
        </StyledView>
    );
};

export default Doctor;

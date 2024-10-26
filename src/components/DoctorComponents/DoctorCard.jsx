import { FontAwesome } from '@expo/vector-icons'; // For icons
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

// Styling components with NativeWind
const StyledView = styled(View);
const StyledText = styled(Text);

const DoctorCard = ({ doctor }) => {
    return (
        <StyledView className="border border-orange-500 rounded-lg p-4 my-2 bg-white items-center">
            <StyledView className="w-24 h-24 bg-gray-300 rounded-full justify-center items-center mb-4">
                <FontAwesome name="user-md" size={50} color="black" />
            </StyledView>
            <StyledText className="text-lg font-bold text-purple-800 mb-0">{doctor.doctorName}</StyledText>
            <StyledText className="text-sm mb-2">{doctor.speciality} | {doctor.qualification}</StyledText>
            <StyledText className="text-lg mb-2">Rs. {doctor.fee}</StyledText>
            <StyledView className="flex-row items-center mb-1">
                <FontAwesome name="map-marker" size={14} color="black" />
                <StyledText className="text-sm ml-2">{doctor.address}</StyledText>
            </StyledView>
            <StyledView className="flex-row items-center mb-1">
                <FontAwesome name="clock-o" size={14} color="black" />
                <StyledText className="text-sm ml-2">Exp: {doctor.experience} Yrs</StyledText>
            </StyledView>
            <StyledView className="flex-row items-center">
                <FontAwesome name="hospital-o" size={14} color="black" />
                <StyledText className="text-sm ml-2">{doctor.clinicName}</StyledText>
            </StyledView>
        </StyledView>
    );
}

export default DoctorCard;
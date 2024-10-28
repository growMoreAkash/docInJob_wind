import React, { useState, useEffect } from 'react';
import { BookAppointment, AppointmentPayment } from '../../api/api.jsx';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';

// Styling components with NativeWind
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const BookDoctor = ({ doctor, user = null }) => {
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [reason, setReason] = useState("");
    const [patientName, setPatientName] = useState("");
    const [patientAge, setPatientAge] = useState("");
    const [patientGender, setPatientGender] = useState("");
    const [submitText, setSubmitText] = useState('Book Now')
    const [submitDisabled, setSubmitDisabled] = useState(false)
    const [dateSlots, setDateSlots] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const input = doctor.timings;

        function formatDate(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }

        function formatReadableDate(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = date.toLocaleString('en-US', { month: 'short' });
            return `${day} ${month}`;
        }

        function parseTimeRange(timeString) {
            const [day, ...rest] = timeString.split(" | ");
            const timeRange = rest.slice(0, rest.length - 1).join(" "); // Join time ranges
            const id = rest[rest.length - 1]; // Get the last part as ID
            return { day, timeRange, id }; // Return day, timeRange, and ID
        }

        const dayIndexMap = {
            Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6
        };

        const timeSlots = input.split(',').map(slot => parseTimeRange(slot.trim()));

        function generateNextSevenDaysOptions() {
            const options = [];
            const currentDate = new Date();

            for (let i = 1; i < 8; i++) {
                const futureDate = new Date();
                futureDate.setDate(currentDate.getDate() + i);

                const dayOfWeek = futureDate.getDay();
                const weekDayName = futureDate.toLocaleDateString('en-US', { weekday: 'short' });

                const matchingSlots = timeSlots
                    .filter(slot => dayIndexMap[slot.day] === dayOfWeek)
                    .map(slot => ({
                        timeRange: slot.timeRange,
                        id: slot.id
                    }));

                options.push({
                    date: formatDate(futureDate),
                    readableDate: formatReadableDate(futureDate),
                    weekday: weekDayName,
                    time: matchingSlots
                });
            }

            return options;
        }

        setDateSlots(generateNextSevenDaysOptions());
    }, [doctor]);

    useEffect(() => {
        setPatientName(user ? user.name ?? "" : "");
        setPatientAge(user ? user.age ?? "" : "");
        setPatientGender(user ? user.gender ?? "" : "");

        if (dateSlots.length >= 7)
            for (let i = 0; i < 7; i++) {
                if (dateSlots[i].time.length > 0) {
                    setSelectedDate(dateSlots[i].date);
                    setTimeSlots(dateSlots[i].time);
                    setSelectedTime(dateSlots[i].time[0]);
                    break;
                }
            }
    }, [user, dateSlots]);

    const handleBooking = async () => {
        setSubmitText('Booking...');
        setSubmitDisabled(true);
        try {
            var response = await BookAppointment({
                data: {
                    doctorId: doctor.doctorId,
                    clinicId: doctor.clinicId,
                    reason: reason,
                    date: selectedDate,
                    timeVisited: selectedTime.timeRange,
                    patientName: patientName,
                    patientAge: patientAge,
                    patientGender: patientGender
                }
            });
            response = await AppointmentPayment({ params: { appId: response._id, policy_name: 'xyz' } });
            window.location.href = response.short_url;
        } catch (error) {
            console.error('Error in BookAppointment:', error.response ? error.response.data : error.message);
            setSubmitText('Book Now');
            setSubmitDisabled(false);
        }
    };

    return (
        <ScrollView className="pb-16">
            <StyledView className="px-3">
                <StyledView className="my-3">
                    <StyledText className="text-md mb-2">Select Day</StyledText>
                    <StyledView className="flex-row flex-wrap gap-2">
                        {dateSlots.map((day, index) => (
                            <StyledTouchableOpacity
                                key={`day-${index}`}
                                onPress={() => { setSelectedDate(day.date); setTimeSlots(day.time); setSelectedTime(day.time[0]); }}
                                className={day.date === selectedDate ? "border border-orange-500 bg-orange-500 rounded-lg p-2" : day.time.length < 1 ? "border border-orange-200 rounded-lg p-2" : "border border-orange-500 rounded-lg p-2"}
                                disabled={day.time.length < 1}
                            >
                                <StyledText className={day.date === selectedDate ? "text-black" : day.time.length < 1 ? "text-slate-400" : "text-orange-500"}>
                                    {day.weekday}, {day.readableDate}
                                </StyledText>
                            </StyledTouchableOpacity>
                        ))}
                    </StyledView>
                </StyledView>
                {timeSlots.length > 0 ? (
                    <StyledView className="my-3">
                        <StyledText className="text-md mb-2">Select Time</StyledText>
                        <StyledView className="flex-row flex-wrap gap-2">
                            {timeSlots.map((time, index) => (
                                <StyledTouchableOpacity
                                    key={`time-${index}`}
                                    onPress={() => { setSelectedTime(time); }}
                                    className={time === selectedTime ? "border border-orange-500 bg-orange-500 rounded-lg p-2" : "border border-orange-500 rounded-lg p-2"}
                                >
                                    <StyledText className={time === selectedTime ? "text-black" : "text-orange-500"}>
                                        {time.timeRange}
                                    </StyledText>
                                </StyledTouchableOpacity>
                            ))}
                        </StyledView>
                    </StyledView>
                ) : (<></>)}
                {selectedDate && selectedTime ? (
                    <StyledView>
                        <StyledView className="mb-3">
                            <StyledText className="text-md mb-2">Reason</StyledText>
                            <StyledTextInput
                                className="border border-orange-500 rounded-lg p-2"
                                placeholder="Specify the purpose of your visit: Disease, Symptoms, Diagnosis, Problems etc. (Optional)"
                                style={{ height: 100 + "px" }}
                                value={reason}
                                onChange={(e) => { setReason(e.target.value) }}>
                            </StyledTextInput>
                        </StyledView>
                        <StyledView className="mb-3">
                            <StyledText className="text-md mb-2">Patient Name</StyledText>
                            <StyledTextInput
                                type="text"
                                className="border border-orange-500 rounded-lg p-2"
                                placeholder="Patient Name"
                                value={patientName}
                                required={true}
                                onChange={(e) => { setPatientName(e.target.value) }}
                            />
                        </StyledView>
                        <StyledView className="mb-3">
                            <StyledText className="text-md mb-2">Patient Age</StyledText>
                            <StyledTextInput
                                type="number"
                                className="border border-orange-500 rounded-lg p-2"
                                placeholder="Patient Age"
                                value={patientAge}
                                required={true}
                                onChange={(e) => { setPatientAge(e.target.value) }}
                            />
                        </StyledView>
                        <StyledView className="mb-3">
                            <StyledText className="text-md mb-2">Patient Gender</StyledText>
                            <StyledTextInput
                                className="border border-orange-500 rounded-lg p-2"
                                defaultValue={patientGender}
                                required={true}
                                onChange={(e) => { setPatientGender(e.target.value) }}
                            />
                        </StyledView>
                        {user != null ? (
                            <StyledTouchableOpacity className='bg-purple-800 rounded-lg p-3 w-100' onPress={handleBooking} disabled={submitDisabled}>
                                <StyledText className="text-white text-center">{submitText}</StyledText>
                            </StyledTouchableOpacity>
                        ) : (
                            <StyledTouchableOpacity className='bg-purple-800 rounded-lg p-3 w-100' onPress={() => navigation.navigate('User')}>
                                <StyledText className="text-white text-center">Book Now</StyledText>
                            </StyledTouchableOpacity>
                        )}
                    </StyledView>
                ) : (
                    <></>
                )}
            </StyledView>
        </ScrollView>
    );
}

export default BookDoctor;
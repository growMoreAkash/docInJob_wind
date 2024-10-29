import { useState } from "react";
import { View, Text, TouchableOpacity, Linking } from 'react-native'
import { AppointmentPayment } from "../../api/api";

const Appointment = ({ appointment }) => {
    const [payText, setPayText] = useState('Pay');
    const [payDisabled, setPayDisabled] = useState(false);

    const pay = async () => {
        setPayText('Redirecting...');
        setPayDisabled(true);
        var response = await AppointmentPayment({ params: { appId: appointment._id, policy_name: 'xyz' } });
        Linking.canOpenURL(response.short_url).then(() => {
            Linking.openURL(response.short_url);
        });
    }

    return (
        <View>
            <View className="p-2">
                <Text className="text-lg">{appointment.doctorId.name}</Text>
                <Text className="text-slate-400">{appointment.doctorId.specialization}</Text>
            </View>
            <View className="p-2">
                <Text className="text-lg">{appointment.patientName} {appointment?.patientAge ?? ""} {appointment?.patientGender ?? " "[0]}</Text>
                <Text className="text-slate-400">Patient</Text>
            </View>
            <View className="p-2 flex-row gap-2">
                {/* <i className="bi bi-hospital"></i> */}
                <View>
                    <View className="flex-row items-center gap-2">
                        <Text className="text-lg">{appointment.clinicId.name}</Text>
                        <TouchableOpacity onPress={Linking.canOpenURL(appointment.clinicId.map_link).then(() => { Linking.openURL(appointment.clinicId.map_link); })}>
                            <Text>Open in Map</Text>
                            {/* <i className="bi bi-map lh-1"></i> */}
                        </TouchableOpacity>
                    </View>
                    <Text className="text-slate-400">{appointment.clinicId.address.locality}, {appointment.clinicId.address.city}, {appointment.clinicId.address.pincode}</Text>
                </View>
            </View>
            <View className="p-2 flex-row gap-2">
                {/* <i className="bi bi-clock-history"></i> */}
                <View>
                    <Text className="text-lg">{appointment.timeVisited}, {(new Date(Date.parse(appointment.date))).toDateString()}</Text>
                    <Text className="text-slate-400">Time Slot</Text>
                </View>
            </View>
            <View className="p-2 flex-row gap-2">
                {/* <i className="bi bi-arrow-clockwise"></i> */}
                <View>
                    <Text className="text-lg">Status: {appointment.status}</Text>
                    <Text className="text-sm text-slate-400">ID: {appointment._id}</Text>
                </View>
            </View>
            <View className="p-2">
                {appointment.paymentStatus !== "paid" ? (
                    <TouchableOpacity onPress={pay} className="bg-purple-800 rounded-lg p-2" disabled={payDisabled}><Text>{payText}</Text></TouchableOpacity>
                ) : (<Text className="py-2" disabled={true}>Payment Done</Text>)}
            </View>
        </View>
    );
}

export default Appointment;
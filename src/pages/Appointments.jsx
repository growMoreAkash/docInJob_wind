import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import Appointment from '../components/DoctorComponents/Appointment';
import { GetAppointments } from '../api/api'

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [newAppointments, setNewAppointments] = useState([])
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [shown, setShown] = useState(0);
    const [total, setTotal] = useState(0);

    const getAppointments = useCallback(async () => {
        var response = await GetAppointments({ data: { page: page } });
        if (page !== response.pagination.currentPage)
            setPage(response.pagination.currentPage);
        setNewAppointments(response.appointments);
        setPages(response.pagination.totalPages);
        setTotal(response.pagination.totalAppointments);
    }, [page]);

    useEffect(() => {
        if (newAppointments) {
            var totalAppointments = []
            if (page === 1)
                totalAppointments = newAppointments;
            else
                totalAppointments = appointments.concat(newAppointments)
            setNewAppointments(null);
            setAppointments(totalAppointments);
        }
        setShown(appointments.length);
    }, [appointments, newAppointments, page]);

    useEffect(() => {
        getAppointments();
    }, [getAppointments]);

    return (
        <ScrollView className="flex-1 mt-[60px] mb-16 p-3">
            <Text className='text-slate-400 mt-0 mb-3'>Showing {shown} of {total} Appointments</Text>
            <View className="justify-center items-center">
                {appointments.length ? appointments.map((appointment, index) => (
                    <Appointment key={`appointment-${index}`} appointment={appointment} />
                )) : (
                    <Text>You have no appointments!</Text>
                )}
                {page < pages && (
                    <TouchableOpacity className='bg-purple-800 rounded-lg p-2' onPress={getAppointments}><Text>Load More</Text></TouchableOpacity>
                )}
            </View>
        </ScrollView>
    )
}

export default Appointments
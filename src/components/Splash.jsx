// components/Splash.jsx
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const Splash = ({ onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onFinish) {
                onFinish(); // Call the function to navigate away from the splash screen
            }
        }, 2000); // Display for 2 seconds

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, [onFinish]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2c0078' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }} className="text-white">Loading...</Text>
            <ActivityIndicator size="large" color="white" />
        </View>
    );
};

export default Splash;

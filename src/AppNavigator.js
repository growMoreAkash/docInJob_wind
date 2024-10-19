import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Signup from "./components/Signup.jsx";
import About from "./components/FooterComponents/About.jsx";
import Comming from './components/Comming.jsx';
import Doctor from './components/DoctorComponents/DoctorCard.jsx';
import Test from './components/FooterComponents/Test.jsx';
import Splash from './components/Splash.jsx';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const [isSplashVisible, setIsSplashVisible] = useState(true); // State to control splash visibility

    const handleSplashFinish = () => {
        setIsSplashVisible(false); // Hide the splash screen
    };

    return (
        <NavigationContainer>
            {isSplashVisible ? (
                <Splash onFinish={handleSplashFinish} /> // Pass the function correctly
            ) : (
                <>
                    <Navbar />
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" component={Main} />
                        <Stack.Screen name="Signup" component={Signup} />
                        <Stack.Screen name="About" component={About} />
                        <Stack.Screen name="Comming" component={Comming} />
                        <Stack.Screen name="Doctor" component={Doctor} />
                        <Stack.Screen name="Test" component={Test} />
                    </Stack.Navigator>
                    <Footer />
                </>
            )}
        </NavigationContainer>
    );
}
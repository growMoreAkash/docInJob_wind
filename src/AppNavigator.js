import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from "./components/Hero.jsx"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import Signup from "./components/Signup.jsx"
import About from "./components/FooterComponents/About.jsx"
import Comming from './components/Comming.jsx';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <>
            <NavigationContainer>
                <Navbar />
                <Stack.Navigator initialRouteName="Main">
                    <Stack.Screen name="Home" component={Main} />
                    <Stack.Screen name="Signup" component={Signup} />
                    <Stack.Screen name="About" component={About} />
                    <Stack.Screen name="Comming" component={Comming} />
                </Stack.Navigator>
                <Footer />
            </NavigationContainer>
        </>

    );
}

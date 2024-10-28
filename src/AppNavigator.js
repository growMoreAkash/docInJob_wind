import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GetUser, GetCities, GetSpecialities } from './api/api.jsx';
import Splash from './components/Splash.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import User from "./pages/User.jsx";
import Doctor from './pages/Doctor.jsx';
import Test from './pages/Test.jsx';
import Comming from './pages/Comming.jsx';
import About from "./pages/About.jsx";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isSplashVisible, setIsSplashVisible] = useState(true); // State to control splash visibility
  const [user, setUser] = useState(null);
  const [cities, setCities] = useState(['']);
  const [cityIndex, setCityIndex] = useState(1);
  const [specialities, setSpecialities] = useState([]);

  const handleSplashFinish = () => {
    setIsSplashVisible(false); // Hide the splash screen
  };

  const getUser = async () => {
    setUser(await GetUser());
  }

  const getCities = async (city) => {
    setCities([''].concat(await GetCities(city)));
  }

  const getSpecialities = async (city) => {
    setSpecialities(await GetSpecialities(city));
  }

  useEffect(() => {
    getUser();
    getCities();
    getSpecialities();
  }, []);

  return (
    <NavigationContainer>
      {isSplashVisible ? (
        <Splash onFinish={handleSplashFinish} /> // Pass the function correctly
      ) : (
        <>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} initialParams={{ setCityIndex: setCityIndex, cities: cities, specialities: specialities, cityIndex: cityIndex }} />
            <Stack.Screen name="User" component={User} initialParams={{ user: user, getUser: getUser }} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Comming" component={Comming} />
            <Stack.Screen name="Doctor" component={Doctor} initialParams={{ user: user, setCityIndex: setCityIndex, cities: cities, cityIndex: cityIndex, specialities: specialities }} />
            <Stack.Screen name="Test" component={Test} />
          </Stack.Navigator>
          <Navbar />
          <Footer />
        </>
      )}
    </NavigationContainer>
  );
}
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GetUser, GetCities, GetSpecialities } from './api/api.jsx';
import Splash from './components/Splash.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import User from "./pages/User.jsx";
import Appointments from './pages/Appointments.jsx';
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
  const [search, setSearch] = useState('');

  const handleSplashFinish = () => {
    setIsSplashVisible(false); // Hide the splash screen
  };

  const getUser = async () => {
    setUser(await GetUser());
  }

  const getCities = async () => {
    setCities([''].concat(await GetCities()));
  }

  const getSpecialities = async () => {
    setSpecialities(await GetSpecialities());
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
            <Stack.Screen name="Home">
              {(props) => <Home {...props} setSearch={setSearch} search={search} setCityIndex={setCityIndex} cities={cities} specialities={specialities} cityIndex={cityIndex} />}
            </Stack.Screen>
            <Stack.Screen name="User">
              {(props) => <User {...props} user={user} getUser={getUser} />}
            </Stack.Screen>
            <Stack.Screen name="Appointments" component={Appointments} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Comming" component={Comming} />
            <Stack.Screen name="Doctor">
              {(props) => <Doctor {...props} user={user} setSearch={setSearch} search={search} setCityIndex={setCityIndex} cities={cities} cityIndex={cityIndex} specialities={specialities} />}
            </Stack.Screen>
            <Stack.Screen name="Test" component={Test} />
          </Stack.Navigator>
          <Navbar user={user} />
          <Footer />
        </>
      )}
    </NavigationContainer>
  );
}
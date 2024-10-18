import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Footer from "../components/Footer.jsx"
import Navbar from "../components/Navbar.jsx"
import Hero from "../components/Hero.jsx"



export default function App() {
  return (
    <View className="flex-1 bg-white">
      <Navbar />
      <Hero />
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}
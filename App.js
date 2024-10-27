import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import Dashboard from "./pages/Dashboard.js";
import SymptomsAnalysis from "./pages/SymptomsAnalysis.js";
import ClinicFinder from "./pages/ClinicFinder.js";
import Settings from "./pages/Settings.js";
import SplashScreen from './pages/SplashScreen';
import Toast from 'react-native-toast-message';
import VideoConsultationScreen from './pages/VideoConsultation/VideoConsultationScreen';
import 'react-native-get-random-values';

//Settings pages
import About from './pages/Settings/About.js'
import PrivacyPolicy from './pages/Settings/PrivacyPolicy.js'
import TermsOfUse from './pages/Settings/TermsOfUse.js'

const App = () => {
  
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
    {/*SplashScreen default route*/}
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }} // Hide the header for SplashScreen
        />

        {/*Login*/}
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} // Hide the header for Login
        />

        {/*Register*/}
        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{ headerShown: false }} // Hide the header for Register
        />

        {/*Dashboard*/}
        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard} 
          options={{ headerShown: false }} // Hide the header for Dashboard
        />

        {/*VideoConsultation*/}
        <Stack.Screen
          name="VideoConsultationScreen"
          component={VideoConsultationScreen}
          options={{ headerShown: false }} // Hide the header for VideoConsultation
        />

        {/*Symptoms*/}
        <Stack.Screen 
          name="SymptomsAnalysis" 
          component={SymptomsAnalysis} 
          options={{ headerShown: false }} // Hide the header for SymptomsAnalysis
        />

        {/*Clinic Finder*/}
        <Stack.Screen
          name="ClinicFinder"
          component={ClinicFinder}
          options={{headerShown: false}}
        />

        {/*Settings*/}
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{headerShown: false}} // Hide the header for Settings
        />

        {/*About*/}
        <Stack.Screen
          name="About"
          component={About}
          options={{ headerShown: false }} // Hide the header for Settings
        />

        {/*PrivacyPolicy*/}
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{ headerShown: false }} // Hide the header for Settings
        />

        {/*TermsOfUse*/}
        <Stack.Screen
          name="TermsOfUse"
          component={TermsOfUse}
          options={{ headerShown: false }} // Hide the header for Settings
        />
      </Stack.Navigator>

      {/* Toast component should be placed here */}
      <Toast />
    </NavigationContainer>
  );
};

export default App;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./pages/Authentication/Register";
import Login from "./pages/Authentication/Login";
import Dashboard from "./pages/Dashboard";
import SymptomsAnalysis from "./pages/SymptomsAnalysis";
import ClinicFinder from "./pages/ClinicFinder";
import Settings from "./pages/Settings";
import SplashScreen from "./pages/SplashScreen";
import Toast from "react-native-toast-message";
import MapComponent from "./components/MapComponent";
import VideoConsultationScreen from "./pages/VideoConsultation/VideoConsultationScreen";
import Ambulance from './pages/Ambulance';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import AccountCenter from "./pages/Settings/AccountCenter";
import About from "./pages/Settings/About";
import PrivacyPolicy from "./pages/Settings/PrivacyPolicy";
import TermsOfUse from "./pages/Settings/TermsOfUse";
import Health from './pages/Health';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#000000" translucent={true} />
      {/* SplashScreen as the initial route */}
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VideoConsultationScreen"
          component={VideoConsultationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SymptomsAnalysis"
          component={SymptomsAnalysis}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ClinicFinder"
          component={ClinicFinder}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccountCenter"
          component={AccountCenter}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TermsOfUse"
          component={TermsOfUse}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MapComponent"
          component={MapComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ambulance"
          component={Ambulance}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
      
        <Stack.Screen
          name="Health"
          component={Health}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

      {/* Toast should be placed here */}
      <Toast />
    </NavigationContainer>
  );
};

export default App;

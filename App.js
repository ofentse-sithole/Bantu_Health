import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SymptomsAnalysis from "./pages/SymptomsAnalysis";
import ClinicFinder from "./pages/ClinicFinder";
import Settings from "./pages/Settings";
import SplashScreen from "./pages/SplashScreen";
import Toast from "react-native-toast-message";
import MapComponent from "./pages/MapComponent"; // Adjusted import path
import MedicalHotspots from "./pages/MedicalHotspots"; // Adjusted import path

// Settings sub-pages
import About from "./pages/Settings/About";
import PrivacyPolicy from "./pages/Settings/PrivacyPolicy";
import TermsOfUse from "./pages/Settings/TermsOfUse";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
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
          component={MapComponent} // Fixed component reference
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MedicalHotspots"
          component={MedicalHotspots} // Fixed component reference
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

      {/* Toast should be placed here */}
      <Toast />
    </NavigationContainer>
  );
};

export default App;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import Dashboard from "./pages/Dashboard.js";
import SymptomsAnalysis from "./pages/SymptomsAnalysis.js";
import SplashScreen from './pages/SplashScreen';
import Toast from 'react-native-toast-message';

const App = () => {
  
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }} // Hide the header for SplashScreen
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} // Hide the header for Login
        />
        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{ headerShown: false }} // Hide the header for Register
        />
        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard} 
          options={{ headerShown: false }} // Hide the header for Dashboard
        />
        <Stack.Screen 
          name="SymptomsAnalysis" 
          component={SymptomsAnalysis} 
          options={{ headerShown: false }} // Hide the header for SymptomsAnalysis
        />
      </Stack.Navigator>

      {/* Toast component should be placed here */}
      <Toast />
    </NavigationContainer>
  );
};

export default App;

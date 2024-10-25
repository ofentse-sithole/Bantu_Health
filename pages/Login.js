// pages/Login.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { auth } from "../firebaseConfig"; 
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firestore imports
import Toast from 'react-native-toast-message'; // Importing Toast

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  // Helper function to display a toast message
  const showToast = (message) => {
    Toast.show({
      text1: message,
      position: "bottom", // Position of the toast
      type: "info", // Type of toast (success, error, info)
      visibilityTime: 4000, // Duration for which the toast is visible
      autoHide: true, // Automatically hide after visibility time
      bottomOffset: 30, // Offset from the bottom
    });
  };

  // Handle login
  const handleLogin = async () => {
    if (!email || !password) {
      showToast("Please enter both email and password");
      return;
    }

    setLoading(true); // Start loading

    try {
      // Authenticate user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Read user data from Firestore
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User data:", userData);

        showToast("Login successful!");
        navigation.navigate("Dashboard"); // Navigate to Dashboard on success
      } else {
        showToast("No user data found!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      showToast("Login failed! Please create an account.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button 
        title={loading ? "Logging in..." : "Login"} 
        onPress={handleLogin} 
        disabled={loading} 
      />

      <Button 
        title="Register" 
        onPress={() => navigation.navigate("Register")} 
      />

    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default Login;

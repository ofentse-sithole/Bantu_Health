import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Firestore imports
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Firebase auth config
import Toast from 'react-native-toast-message'; // Importing Toast

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [loading, setLoading] = useState(false); // Loading state

  // Place the showToast function here
  const showToast = (message) => {
    Toast.show({
      text1: message,
      position: "bottom",
      type: "success", // Change this to 'error', 'info', or 'success'
      visibilityTime: 4000, // How long the toast is visible
      autoHide: true, // Automatically hide after visibility time
      topOffset: 30, // Offset from the top
    });
  };

  
  const handleRegister = async () => {
    // Validation for empty fields
    if (!email || !password || !userName || !confirmPassword) {
      showToast("Please fill all fields");
      return;
    }
    // Validation for password match
    if (password !== confirmPassword) {
      showToast("Passwords do not match");
      return;
    }

    setLoading(true); // Start loading

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data in Firestore (excluding password)
      const db = getFirestore();
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        userName: userName,
        createdAt: new Date().toISOString(),
      });

      showToast("Registration successful!");
      navigation.navigate("Login"); // Navigate to Login on success
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      showToast(`Error: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userName}
        onChangeText={setUserName}
        keyboardType="default"
        autoCapitalize="none"
      />

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

      <TextInput
        style={styles.input}
        placeholder="Confirm Password" // New Confirm Password field
        value={confirmPassword}
        secureTextEntry
        onChangeText={setConfirmPassword}
      />

      <Button 
        title={loading ? "Registering..." : "Register"} 
        onPress={handleRegister} 
        disabled={loading} 
      />

      <Button 
        title="Login" 
        onPress={() => navigation.navigate("Login")} 
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default Register;

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Toast from 'react-native-toast-message';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [surname, setSurname] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const showToast = (message) => {
    Toast.show({
      text1: message,
      position: "bottom",
      type: "success",
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
    });
  };

  const handleRegister = async () => {
    if (!email || !password || !userName || !confirmPassword) {
      showToast("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      showToast("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const db = getFirestore();
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        userName: userName,
        surname: surname,
        cellphone: cellphone,
        createdAt: new Date().toISOString(),
      });

      showToast("Registration successful!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      showToast(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={userName}
        onChangeText={setUserName}
        keyboardType="default"
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Surname"
        value={surname}
        onChangeText={setSurname}
        keyboardType="default"
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={cellphone}
        onChangeText={setCellphone}
        keyboardType="phone-pad"
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
        placeholder="Confirm Password"
        value={confirmPassword}
        secureTextEntry
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>
          Already have an account? <Text style={styles.link}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  button: {
    height: 50,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
  link: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default Register;

// pages/Dashboard.js
import React, { useEffect, useState } from "react";
import {
  View, Text, Button, StyleSheet, TouchableOpacity, FlatList,
ScrollView, Alert, Modal, TextInput, Linking, KeyboardAvoidingView, Platform } from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DashboardNavbar from '../pages/Navbar/DashboardNavbar'

const Dashboard = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", user.uid));

      }
      setLoading(false);
    };

    fetchUserData();
  }, [user]);

  const handleLogout = () => {
    auth.signOut()
      .then(() => navigation.navigate("Login"))
      .catch((error) => console.error("Error logging out:", error));
  };

  const handleSOS = async () => {
    const phoneNumber = "tel:112"; // Adjust the emergency number if needed
    Linking.openURL(phoneNumber);
  };

  
  return (
    <ScrollView contentContainerStyle={styles.container}>

      {loading ? (
        <Text style={styles.userInfo}>Loading...</Text>
      ) : user ? (
        <Text style={styles.userInfo}>Welcome, {userName || "User"}</Text>
      ) : (
        <Text style={styles.userInfo}>No user is logged in.</Text>
      )}

      <Text style={styles.sectionTitle}>Quick Features</Text>

      {/*Grid block */}
      <View style={styles.gridContainer}>

        {/*AI*/}
        <TouchableOpacity style={styles.gridItem}>
          <FontAwesome5 name="virus" size={30} color="#007BFF" style={styles.icon} />
          <Text style={styles.gridTitle}>Symptoms</Text>
        </TouchableOpacity>

        {/*Hotspot*/}
        <TouchableOpacity style={styles.gridItem}>
          <Icon name="hospital-o" size={30} color="#007BFF" style={styles.icon} />
          <Text style={styles.gridTitle}>Medical Hotpots</Text>
        </TouchableOpacity>

      </View>


      {/*Grid Bloc */}
      <View style={styles.gridContainer}>
        {/*Education*/}
        <TouchableOpacity style={styles.gridItem}>
          <Icon name="book" size={30} color="#007BFF" style={styles.icon} />
          <Text style={styles.gridTitle}>Education</Text>
        </TouchableOpacity>

      {/*Settings*/}
      <TouchableOpacity style={styles.gridItem}
          onPress={() => navigation.navigate("Settings")}>
      <Icon name="cogs" size={30} color="#007BFF" style={styles.icon} />
        <Text style={styles.gridTitle}>Settings</Text>
      </TouchableOpacity>

       
      </View>

      {/*Grid Bloc */}
      <View style={styles.gridContainer}>
      {/*Call*/}
        
      <TouchableOpacity style={styles.gridItemEmergency} 
        onPress={() => navigation.navigate('VideoConsultationScreen')}>
        <Icon name="video-camera" size={30} color="#007BFF" style={styles.icon} />
        <Text style={styles.buttonText}>Book Video Consultation</Text>
      </TouchableOpacity>
      </View>
      
      <DashboardNavbar />
    </ScrollView>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 35,
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
    textAlign: "center",
  },


  userInfo: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },

  //quick features
  sectionTitle: {
    fontSize: 24,
    marginVertical: 10,
    fontWeight: "bold",
    textAlign: "center"
  },

  gridTitle: {
    textAlign:"center"
  },

  gridText: {
    textAlign: "center"
  },

  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },

  gridItemEmergency: {
    backgroundColor: "pink",
    padding: 15,
    borderRadius: 10,
    width: "45%",
  },

  gridItem: {
    backgroundColor: "#e6f7ff",
    padding: 15,
    borderRadius: 10,
    width: "45%",
  },

  sosButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  sosButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  contactCard: {
    backgroundColor: "#e6f7ff",
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
  },
  contactButtonContainer: {
    marginVertical: 15,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  icon: {
    marginBottom: 8,
    textAlign: "center"
  }
});

export default Dashboard;
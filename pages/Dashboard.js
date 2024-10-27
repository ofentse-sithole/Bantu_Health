import React, { useEffect, useState } from "react";
import {
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Linking, 
  SafeAreaView 
} from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DashboardNavbar from './Navbar/DashboardNavbar';

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
    const phoneNumber = "tel:112";
    Linking.openURL(phoneNumber);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {loading ? (
          <Text style={styles.userInfo}>Loading...</Text>
        ) : user ? (
          <Text style={styles.userInfo}>Welcome, {userName || "User"}</Text>
        ) : (
          <Text style={styles.userInfo}>No user is logged in.</Text>
        )}

        <Text style={styles.sectionTitle}>Quick Features</Text>

        <View style={styles.gridContainer}>
          <TouchableOpacity 
            style={styles.gridItem} 
            onPress={() => navigation.navigate("SymptomsAnalysis")}
          >
            <FontAwesome5 name="virus" size={30} color="#007BFF" style={styles.icon} />
            <Text style={styles.gridTitle}>Symptoms</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <Icon name="hospital-o" size={30} color="#007BFF" style={styles.icon} />
            <Text style={styles.gridTitle}>Medical Hotpots</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.gridItem}>
            <Icon name="book" size={30} color="#007BFF" style={styles.icon} />
            <Text style={styles.gridTitle}>Education</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridItem}
            onPress={() => navigation.navigate("Settings")}
          >
            <Icon name="cogs" size={30} color="#007BFF" style={styles.icon} />
            <Text style={styles.gridTitle}>Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          <TouchableOpacity 
            style={styles.gridItemEmergency}
            onPress={() => navigation.navigate('VideoConsultationScreen')}>
            <Icon name="video-camera" size={30} color="#007BFF" style={styles.icon} />
            <Text style={styles.buttonText}>Book Video Consultation</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      <DashboardNavbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
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
  sectionTitle: {
    fontSize: 24,
    marginVertical: 10,
    fontWeight: "bold",
    textAlign: "center"
  },
  gridTitle: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 8,
    color: "#333",
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
    backgroundColor: "#F0F8FF",
    padding: 20,
    borderRadius: 15,
    width: "90%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gridItem: {
    backgroundColor: "#F0F8FF",
    padding: 20,
    borderRadius: 15,
    width: "45%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
  },
  icon: {
    marginBottom: 8,
    textAlign: "center",
    alignSelf: "center",
  }
});

export default Dashboard;

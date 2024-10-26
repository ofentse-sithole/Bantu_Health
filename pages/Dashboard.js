import React, { useEffect, useState } from "react";
import {
  View, 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView, 
  Linking, 
  Platform 
} from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DashboardNavbar from '../pages/Navbar/DashboardNavbar';
import { StatusBar } from 'expo-status-bar';

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
        if (userDoc.exists()) {
          setUserName(userDoc.data().userName);
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, [user]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="#e32f45" />
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
          <TouchableOpacity style={styles.gridItem}>
            <FontAwesome5 name="virus" size={30} color="#007BFF" style={styles.icon} />
            <Text style={styles.gridTitle}>Symptoms</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <Icon name="hospital-o" size={30} color="#007BFF" style={styles.icon} />
            <Text style={styles.gridTitle}>Medical Hotspots</Text>
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
            onPress={() => Linking.openURL("tel:112")}
          >
            <FontAwesome5 name="phone" size={30} color="red" style={styles.icon} />
            <Text style={styles.gridTitle}>Call</Text>
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
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
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
  icon: {
    marginBottom: 8,
    textAlign: "center"
  }
});

export default Dashboard;

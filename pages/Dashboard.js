import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Importing your views from the pages directory
import DashboardNavbar from "./Navbar/DashboardNavbar";
import MapComponent from "./MapComponent"; // Now treated as a view
import MedicalHotspots from "./MedicalHotspots"; // Also treated as a view

const Dashboard = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [trustedContacts, setTrustedContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [contactName, setContactName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [medicalHotspots, setMedicalHotspots] = useState([]); // Add state for hotspots

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.userName);
          setTrustedContacts(userData.trustedContacts || []);

          // Fetch medical hotspots
          const hotspotsSnapshot = await getDocs(collection(db, 'medicalHotspots'));
          const hotspots = [];
          hotspotsSnapshot.forEach((doc) => {
            hotspots.push({ id: doc.id, ...doc.data() });
          });
          setMedicalHotspots(hotspots); // Set the fetched hotspots
        } else {
          console.log("No user data found!");
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, [user]);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => navigation.navigate("Login"))
      .catch((error) => console.error("Error logging out:", error));
  };

  const addContact = async () => {
    if (!contactName || !relationship || !phoneNumber) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    const newContact = {
      id: Date.now().toString(),
      name: contactName,
      relationship,
      phone: phoneNumber,
    };

    const db = getFirestore();
    await setDoc(
      doc(db, "users", user.uid),
      { trustedContacts: [...trustedContacts, newContact] },
      { merge: true }
    );

    setTrustedContacts([...trustedContacts, newContact]);
    setModalVisible(false);
    setContactName("");
    setRelationship("");
    setPhoneNumber("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DashboardNavbar />

      {loading ? (
        <Text style={styles.userInfo}>Loading...</Text>
      ) : user ? (
        <Text style={styles.userInfo}>Welcome, {userName || "User"}</Text>
      ) : (
        <Text style={styles.userInfo}>No user is logged in.</Text>
      )}

        <Text style={styles.sectionTitle}>Quick Features</Text>

      <View style={styles.gridContainer}>
        {/* MedicalHotspots */}
        <TouchableOpacity style={styles.gridItem}>
          {medicalHotspots.length > 0 ? (
            <MedicalHotspots location={medicalHotspots[0]} />
          ) : (
            <Text>No medical hotspots available</Text>
          )}
        </TouchableOpacity>

        {/* Education View */}
        <TouchableOpacity style={styles.gridItem}>
          <Icon name="book" size={30} color="#007BFF" style={styles.icon} />
          <Text style={styles.gridTitle}>Education</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gridContainer}>
        {/* Settings View */}
        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => navigation.navigate("Settings")}
        >
          <Icon name="cogs" size={30} color="#007BFF" style={styles.icon} />
          <Text style={styles.gridTitle}>Settings</Text>
        </TouchableOpacity>

        {/* Emergency Call View */}
        <TouchableOpacity 
          style={styles.consultationButton} 
          onPress={() => navigation.navigate('VideoConsultationScreen')}
        >
          <Text style={styles.buttonText}>Book Video Consultation</Text>
        </TouchableOpacity>
      </View>

      {/* Placeholder for Map Component */}
      <View style={styles.mapPlaceholder}>
        <MapComponent />
      </View>
    </ScrollView>
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
    marginTop: 35,
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
    textAlign: "center",
  },
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  gridItem: {
    backgroundColor: "#e6f7ff",
    padding: 15,
    borderRadius: 10,
    width: "45%",
  },
  gridItemEmergency: {
    backgroundColor: "pink",
    padding: 15,
    borderRadius: 10,
    width: "45%",
  },
  gridTitle: {
    textAlign: "center",
  },
  icon: {
    marginBottom: 8,
    textAlign: "center",
  },
  mapPlaceholder: {
    marginTop: 20,
    padding: 10,
    borderColor: "#007BFF",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 300, // Set a fixed height for the map
  },
});

export default Dashboard;

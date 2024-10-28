import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  StatusBar,
} from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DashboardNavbar from "../components/Navbar/DashboardNavbar";

const { width } = Dimensions.get('window');

const Dashboard = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const db = getFirestore();
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.userName || "User");
          } else {
            console.log('No user data found');
            setUserName("User");
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserName("User");
        }
      } else {
        console.log('No user is signed in');
        setUserName("User");
      }
      setLoading(false);
    };

    fetchUserData();
  }, [user]);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <>
              <Text style={styles.greetingText}>{getGreeting()}</Text>
              <Text style={styles.userName}>{userName}</Text>
            </>
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Health Services</Text>

            <View style={styles.gridContainer}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("SymptomsAnalysis")}
              >
                <View style={[styles.iconBg, { backgroundColor: '#E8F5E9' }]}>
                  <FontAwesome5 name="virus" size={24} color="#2E7D32" />
                </View>
                <Text style={styles.cardTitle}>Symptoms Check</Text>
                <Text style={styles.cardDescription}>Analyze your symptoms</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("ClinicFinder")}
              >
                <View style={[styles.iconBg, { backgroundColor: '#E3F2FD' }]}>
                  <Icon name="hospital-o" size={24} color="#1565C0" />
                </View>
                <Text style={styles.cardTitle}>Find Clinic</Text>
                <Text style={styles.cardDescription}>Locate nearby facilities</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.gridContainer}>
              <TouchableOpacity style={styles.card}>
                <View style={[styles.iconBg, { backgroundColor: '#FFF3E0' }]}>
                  <Icon name="book" size={24} color="#E65100" />
                </View>
                <Text style={styles.cardTitle}>Health Tips</Text>
                <Text style={styles.cardDescription}>Medical information</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("Settings")}
              >
                <View style={[styles.iconBg, { backgroundColor: '#F3E5F5' }]}>
                  <Icon name="cogs" size={24} color="#6A1B9A" />
                </View>
                <Text style={styles.cardTitle}>Settings</Text>
                <Text style={styles.cardDescription}>Manage your account</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.consultButton}
              onPress={() => navigation.navigate("VideoConsultationScreen")}
            >
              <Icon name="video-camera" size={24} color="#ffffff" style={styles.consultIcon} />
              <Text style={styles.consultText}>Book Video Consultation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <DashboardNavbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#007BFF",
  },
  container: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#007BFF",
  },
  greetingText: {
    fontSize: 24,
    color: "#ffffff",
    opacity: 0.9,
  },
  userName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 5,
  },
  content: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
  },
  featuresContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#2d3436",
    marginBottom: 20,
    marginTop: 10,
  },
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    width: width * 0.43,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  iconBg: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3436",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: "#636e72",
  },
  consultButton: {
    backgroundColor: "#007BFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  consultIcon: {
    marginRight: 10,
  },
  consultText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Dashboard;

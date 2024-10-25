// pages/Dashboard.js
import React, { useEffect, useState } from "react";
import {
  View, Text, Button, StyleSheet, TouchableOpacity, FlatList,
  ScrollView, Alert, Modal, TextInput, Linking, KeyboardAvoidingView, Platform
} from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

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

  const healthTips = [
    "Drink water regularly to stay hydrated.",
    "Include fruits and vegetables in your diet.",
    "Exercise for at least 30 minutes a day.",
    "Get enough sleep to boost your immune system.",
    "Avoid processed foods and reduce sugar intake.",
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.userName);
          setTrustedContacts(userData.trustedContacts || []);
        } else {
          console.log("No user data found!");
        }
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

  const addContact = async () => {
    if (!contactName || !relationship || !phoneNumber) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    const newContact = {
      id: Date.now().toString(),
      name: contactName,
      relationship: relationship,
      phone: phoneNumber,
    };

    const db = getFirestore();
    await setDoc(doc(db, "users", user.uid), {
      trustedContacts: [...trustedContacts, newContact],
    }, { merge: true });

    setTrustedContacts([...trustedContacts, newContact]);
    setModalVisible(false);
    setContactName("");
    setRelationship("");
    setPhoneNumber("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

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
          <Text style={styles.gridTitle}>Medical Insights</Text>
          {healthTips.map((tip, index) => (
            <Text key={index} style={styles.gridText}>
              • {tip}
            </Text>
          ))}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => Alert.alert("Coming Soon", "AI-powered symptom analysis will be available soon!")}
        >
          <Text style={styles.gridTitle}>Symptoms AI</Text>
          <Text style={styles.gridText}>
            Analyze your symptoms with AI for personalized insights.
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
        <Text style={styles.sosButtonText}>SOS Emergency</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Trusted Contacts</Text>
      <FlatList
        data={trustedContacts}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => Linking.openURL(`tel:${item.phone}`)}
          >
            <Text style={styles.contactName}>
              {item.name} ({item.relationship})
            </Text>
            <Text style={styles.contactPhone}>{item.phone}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyList}>No contacts added yet.</Text>}
      />

      <View style={styles.contactButtonContainer}>
        <Button title="Add Trusted Contact" onPress={() => setModalVisible(true)} />
      </View>

      <Button title="Logout" onPress={handleLogout} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalView}
        >
          <View style={styles.formContainer}>
            <Text style={styles.modalTitle}>Add Trusted Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Contact Name"
              value={contactName}
              onChangeText={setContactName}
            />
            <TextInput
              style={styles.input}
              placeholder="Relationship"
              value={relationship}
              onChangeText={setRelationship}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            <View style={styles.buttonContainer}>
              <Button title="Save Contact" onPress={addContact} />
              <View style={{ width: 10 }} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
});

export default Dashboard;
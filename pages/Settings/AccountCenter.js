import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../../firebaseConfig'; // Ensure Firestore is initialized in firebaseConfig
import Icon from 'react-native-vector-icons/FontAwesome5';

const AccountCenter = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    userName: '',
    surname: '',
    cellphone: '',
    email: '',
  });

  // Fetch user data from Firestore based on authenticated user ID
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return; // Ensure user is logged in

      try {
        const db = getFirestore(); // Initialize Firestore
        const userDocRef = doc(db, 'users', user.uid); // Firestore path for the user
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log('No user data found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleSaveChanges = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, userData);
      Alert.alert('Success', 'Your information has been updated.');
    } catch (error) {
      console.error('Error updating user data:', error);
      Alert.alert('Error', 'Failed to update your information.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#4F46E5" style={{ marginTop: 20 }} />;
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.header}>Account Center</Text>

        {/* User Details Display */}
        <View style={styles.section}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={userData.userName}
            onChangeText={(text) => setUserData({ ...userData, userName: text })}
            placeholder="First Name"
            placeholderTextColor="#9CA3AF"
          />

          <Text style={styles.label}>Surname</Text>
          <TextInput
            style={styles.input}
            value={userData.surname}
            onChangeText={(text) => setUserData({ ...userData, surname: text })}
            placeholder="Surname"
            placeholderTextColor="#9CA3AF"
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={userData.cellphone}
            onChangeText={(text) => setUserData({ ...userData, cellphone: text })}
            placeholder="Phone Number"
            placeholderTextColor="#9CA3AF"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={userData.email}
            onChangeText={(text) => setUserData({ ...userData, email: text })}
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Save Changes Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

        {/* Footer Navigation */}
        <Icon name="chevron-left" size={20} color="#4B5563" style={styles.backIcon} onPress={() => navigation.goBack()} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginVertical: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#F9FAFB',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#111827',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  saveButton: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backIcon: {
    marginTop: 30,
    textAlign: 'center',
  },
});

export default AccountCenter;

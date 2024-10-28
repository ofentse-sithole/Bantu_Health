import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import DoctorSelection from './components/DoctorSelection';
import ConsultationList from './components/ConsultationList';
import ConsultationRoom from './components/ConsultationRoom';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for icons

const VideoConsultationScreen = ({ navigation }) => {
  const [healthCredits, setHealthCredits] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [activeConsultation, setActiveConsultation] = useState(null);

  useEffect(() => {
    initializeUserData();
  }, []);

  const initializeUserData = async () => {
    await checkUserHealthCredits();
    await fetchUserBookings();
  };

  const checkUserHealthCredits = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const db = getFirestore();
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setHealthCredits(userData.healthCredits ?? 5);

          if (userData.healthCredits === undefined) {
            await setDoc(userRef, { healthCredits: 5 }, { merge: true });
          }
        }
      }
    } catch (error) {
      console.error('Error checking health credits:', error);
    }
  };

  const fetchUserBookings = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const db = getFirestore();
        const bookingsRef = collection(db, 'users', user.uid, 'bookings');
        const bookingsSnapshot = await getDocs(bookingsRef);

        const bookings = bookingsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setUserBookings(bookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleBooking = async (doctor) => {
    if (healthCredits <= 0) {
      Alert.alert(
        'No Credits',
        'You have no health credits left. Would you like to purchase more credits for R150?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Buy', onPress: () => console.log('Purchase initiated') }
        ]
      );
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const db = getFirestore();
        const userRef = doc(db, 'users', user.uid);
        const bookingsRef = collection(userRef, 'bookings');

        const newBooking = {
          doctorId: doctor.id,
          doctorName: doctor.name,
          date: new Date(),
          status: 'scheduled'
        };

        await addDoc(bookingsRef, newBooking);
        await updateDoc(userRef, { healthCredits: healthCredits - 1 });

        setHealthCredits(prev => prev - 1);
        setUserBookings(prev => [...prev, newBooking]);
        handleStartConsultation(doctor);
      }
    } catch (error) {
      console.error('Error handling booking:', error);
    }
  };

  const handleStartConsultation = (doctor) => {
    setActiveConsultation({
      id: Date.now().toString(),
      roomId: `bantuhealth-consultation-${Date.now()}`,
      doctorName: doctor.name,
    });
  };

  if (activeConsultation) {
    return (
      <ConsultationRoom
        roomId={activeConsultation.roomId}
        onEndCall={() => setActiveConsultation(null)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.pointsText}>
            Health Credits: {healthCredits !== null ? healthCredits : 'Loading...'}
          </Text>
        </View>

        <DoctorSelection
          doctors={[
            {
              id: '1',
              name: 'John Smith',
              specialization: 'General Practitioner',
              availableSlots: 5,
              profileImage: 'https://via.placeholder.com/150',
            },
          ]}
          onSelectDoctor={handleBooking}
        />

        <ConsultationList
          consultations={userBookings}
          onSelectConsultation={setActiveConsultation}
        />
      </View>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 10,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  }
});

export default VideoConsultationScreen;

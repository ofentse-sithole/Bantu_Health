import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Alert, TouchableOpacity, StatusBar } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import DoctorSelection from './components/DoctorSelection';
import ConsultationList from './components/ConsultationList';
import ConsultationRoom from './components/ConsultationRoom';
import { Ionicons } from '@expo/vector-icons';

const VideoConsultationScreen = ({ navigation }) => {
  const [healthCredits, setHealthCredits] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [activeConsultation, setActiveConsultation] = useState(null);
  const [activeTab, setActiveTab] = useState('doctors'); // 'doctors' or 'consultations'

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

  const renderTabButton = (tabName, label, icon) => (
    <TouchableOpacity 
      style={[styles.tabButton, activeTab === tabName && styles.activeTabButton]}
      onPress={() => setActiveTab(tabName)}
    >
      <Ionicons name={icon} size={24} color={activeTab === tabName ? '#007AFF' : '#666'} />
      <Text style={[styles.tabText, activeTab === tabName && styles.activeTabText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

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
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#2D3748" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Video Consultation</Text>

          <View style={styles.creditsContainer}>
            <Ionicons name="medical" size={20} color="#4299E1" />
            <Text style={styles.creditsText}>
            {healthCredits !== null ? Math.max(0, healthCredits) : '...'} Credits
            </Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          {renderTabButton('doctors', 'Find Doctor', 'people')}
          {renderTabButton('consultations', 'My Consultations', 'calendar')}
        </View>

        <View style={styles.content}>
          {activeTab === 'doctors' ? (
            <DoctorSelection
              doctors={[
                {
                  id: '1',
                  name: 'John Smith',
                  specialization: 'General Practitioner',
                  availableSlots: 5,
                  rating: 4.8,
                  experience: '15 years',
                },
              ]}
              onSelectDoctor={handleBooking}
            />
          ) : (
            <ConsultationList
              consultations={userBookings}
              onSelectConsultation={setActiveConsultation}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
  },
  creditsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  creditsText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#4299E1',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#EBF8FF',
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
});

export default VideoConsultationScreen;
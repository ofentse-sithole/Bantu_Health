import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import DoctorSelection from './components/DoctorSelection';
import ConsultationList from './components/ConsultationList';

const VideoConsultationScreen = ({ navigation }) => {
  const [bookingPoints, setBookingPoints] = useState(5);
  const [userBookings, setUserBookings] = useState([]);
  const [activeConsultation, setActiveConsultation] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    checkUserBookingPoints();
  }, []);

  const handleStartConsultation = (doctor) => {
    setSelectedDoctor(doctor);
    setActiveConsultation({
      id: Date.now().toString(),
      roomId: `bantuhealth-consultation-${Date.now()}`,
      doctorName: doctor.name,
    });
  };

  const checkUserBookingPoints = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (!userData.bookingPoints) {
          await setDoc(userRef, { 
            bookingPoints: 5,
            bookings: [] 
          }, { merge: true });
          setBookingPoints(5);
        } else {
          setBookingPoints(userData.bookingPoints);
          setUserBookings(userData.bookings || []);
        }
      }
    }
  };

  const handleBooking = async (doctor) => {
    if (bookingPoints <= 0) {
      showPurchaseDialog();
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);
      
      const newBooking = {
        doctorId: doctor.id,
        doctorName: doctor.name,
        date: new Date(),
        status: 'scheduled'
      };

      await updateDoc(userRef, {
        bookingPoints: bookingPoints - 1,
        bookings: [...userBookings, newBooking]
      });

      setBookingPoints(prev => prev - 1);
      setUserBookings(prev => [...prev, newBooking]);
      handleStartConsultation(doctor);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pointsText}>Booking Points: {bookingPoints}</Text>
      </View>
      
      <DoctorSelection
        doctors={[
          {
            id: '1',
            name: 'John Smith',
            specialization: 'General Practitioner',
            availableSlots: 5,
            profileImage: 'https://example.com/doctor1.jpg'
          },
        ]}
        onSelectDoctor={handleBooking}
      />
      
      <ConsultationList
        consultations={userBookings}
        onSelectConsultation={setActiveConsultation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  }
});

export default VideoConsultationScreen;

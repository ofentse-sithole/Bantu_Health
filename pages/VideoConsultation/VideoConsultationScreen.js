import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const VideoConsultationScreen = ({ navigation }) => {
  const [bookingPoints, setBookingPoints] = useState(5);
  const [userBookings, setUserBookings] = useState([]);
  
  useEffect(() => {
    checkUserBookingPoints();
  }, []);

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
          // Initialize new user with 5 free bookings
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

  const showPurchaseDialog = () => {
    Alert.alert(
      "Purchase More Booking Points",
      "You've used all your free bookings. Would you like to purchase more?",
      [
        {
          text: "Purchase 5 Points ($10)",
          onPress: () => handlePurchase(5, 10)
        },
        {
          text: "Purchase 10 Points ($18)",
          onPress: () => handlePurchase(10, 18)
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };

  const handlePurchase = async (points, price) => {
    // Implement payment processing here
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);
      
      await updateDoc(userRef, {
        bookingPoints: bookingPoints + points,
        purchases: {
          date: new Date(),
          points: points,
          price: price
        }
      });

      setBookingPoints(prev => prev + points);
      Alert.alert("Success", `You've purchased ${points} booking points!`);
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

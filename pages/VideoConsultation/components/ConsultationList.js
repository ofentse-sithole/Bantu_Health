import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const ConsultationList = ({ onSelectConsultation }) => {
  const [userConsultations, setUserConsultations] = useState([]);

  useEffect(() => {
    fetchUserConsultations();
  }, []);

  const fetchUserConsultations = async () => {
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

      setUserConsultations(bookings);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.consultationItem}
      onPress={() => onSelectConsultation(item)}
    >
      <Text style={styles.doctorName}>Dr. {item.doctorName}</Text>
      <Text style={styles.dateTime}>
        {new Date(item.date.seconds * 1000).toLocaleString()}
      </Text>
      <Text style={[
        styles.status,
        { color: item.status === 'completed' ? '#4CAF50' : '#007AFF' }
      ]}>
        {item.status.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Consultations</Text>
      {userConsultations.length > 0 ? (
        <FlatList
          data={userConsultations}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.noBookingsText}>No consultations booked yet</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  consultationItem: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateTime: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  noBookingsText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  }
});

export default ConsultationList;

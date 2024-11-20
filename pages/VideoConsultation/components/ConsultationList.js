import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ConsultationList = () => {
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

  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'completed':
        return { name: 'check-circle', color: '#48BB78' };
      case 'scheduled':
        return { name: 'calendar-clock', color: '#4299E1' };
      case 'cancelled':
        return { name: 'close-circle', color: '#F56565' };
      default:
        return { name: 'information', color: '#718096' };
    }
  };

  const renderItem = ({ item }) => {
    const statusIcon = getStatusIcon(item.status);
    
    return (
      <View style={styles.consultationItem}>
        <View style={styles.headerRow}>
          <View style={styles.doctorInfo}>
            <Icon name="doctor" size={24} color="#2D3748" />
            <Text style={styles.doctorName}>Dr. {item.doctorName}</Text>
          </View>
          <View style={styles.statusContainer}>
            <Icon name={statusIcon.name} size={20} color={statusIcon.color} />
            <Text style={[styles.status, { color: statusIcon.color }]}>
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Icon name="calendar" size={20} color="#718096" />
            <Text style={styles.dateTime}>
              {new Date(item.date.seconds * 1000).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="clock-outline" size={20} color="#718096" />
            <Text style={styles.dateTime}>
              {new Date(item.date.seconds * 1000).toLocaleTimeString()}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultation History</Text>
      {userConsultations.length > 0 ? (
        <FlatList
          data={userConsultations}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          <Icon name="calendar-blank" size={64} color="#CBD5E0" />
          <Text style={styles.noBookingsText}>No consultations booked yet</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 24,
  },
  listContainer: {
    paddingBottom: 16,
  },
  consultationItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginLeft: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  detailsContainer: {
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    padding: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateTime: {
    fontSize: 14,
    color: '#4A5568',
    marginLeft: 8,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  noBookingsText: {
    marginTop: 16,
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
  }
});

export default ConsultationList;

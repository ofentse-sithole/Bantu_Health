import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DoctorSelection = ({ doctors, onSelectDoctor }) => {
  const renderDoctor = ({ item }) => (
    <TouchableOpacity 
      style={styles.doctorCard}
    >
      <View style={styles.cardContent}>
        <View style={styles.imageContainer}>
          <Icon name="account-circle" size={80} color="#2D3748" style={styles.profileImage} />
          <View style={styles.statusIndicator} />
        </View>
        
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>Dr. {item.name}</Text>
          <Text style={styles.specialization}>{item.specialization}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Icon name="clock-outline" size={16} color="#4A5568" />
              <Text style={styles.statText}>{item.availableSlots} slots</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="star" size={16} color="#F6E05E" />
              <Text style={styles.statText}>{item.rating || '4.8'}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.consultButton}
            onPress={() => onSelectDoctor(item)}
          >
            <Text style={styles.consultButtonText}>Book Consultation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Doctors</Text>
      <Text style={styles.subtitle}>Select a specialist for your consultation</Text>
      <FlatList
        data={doctors}
        renderItem={renderDoctor}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 24,
  },
  listContainer: {
    paddingBottom: 16,
  },
  doctorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  profileImage: {
    backgroundColor: '#EDF2F7',
    borderRadius: 40,
  },
  statusIndicator: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#48BB78',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  doctorInfo: {
    flex: 1,
    marginLeft: 16,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  specialization: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    marginLeft: 4,
    color: '#4A5568',
    fontSize: 14,
  },
  consultButton: {
    backgroundColor: '#4299E1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  consultButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default DoctorSelection;

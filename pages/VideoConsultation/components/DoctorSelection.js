import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import the icon set you want to use


const DoctorSelection = ({ doctors, onSelectDoctor }) => {
  const renderDoctor = ({ item }) => (
    <TouchableOpacity 
      style={styles.doctorCard}
      onPress={() => onSelectDoctor(item)}
    >
      <Icon name="account-circle" size={150} color="#007AFF" style={styles.profileImage} />
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>Dr. {item.name}</Text>
        <Text style={styles.specialization}>{item.specialization}</Text>
        <Text style={styles.availability}>Available: {item.availableSlots} slots</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Doctor</Text>
      <FlatList
        data={doctors}
        renderItem={renderDoctor}
        keyExtractor={item => item.id}
      />
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
  doctorCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  doctorInfo: {
    marginLeft: 16,
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  specialization: {
    fontSize: 16,
    color: '#666',
  },
  availability: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 4,
  },
});

export default DoctorSelection;

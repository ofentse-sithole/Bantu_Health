
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const ConsultationList = ({ consultations, onSelectConsultation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.consultationItem}
      onPress={() => onSelectConsultation(item)}
    >
      <Text style={styles.doctorName}>{item.doctorName}</Text>
      <Text style={styles.dateTime}>{new Date(item.dateTime).toLocaleString()}</Text>
      <Text style={styles.status}>{item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Consultations</Text>
      <FlatList
        data={consultations}
        renderItem={renderItem}
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
  consultationItem: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateTime: {
    fontSize: 16,
    color: '#666',
  },
  status: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 4,
  },
});

export default ConsultationList;

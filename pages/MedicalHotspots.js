// components/MedicalHotspots.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MedicalHotspots = ({ location }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical Hotspot Information</Text>
      {/* Check if location is defined and has a name */}
      <Text style={styles.info}>
        Location: {location && location.name ? location.name : "Location not available"}
      </Text>
      {/* Add more information about the hotspot here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default MedicalHotspots;

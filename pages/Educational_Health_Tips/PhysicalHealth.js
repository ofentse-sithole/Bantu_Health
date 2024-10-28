// src/pages/PhysicalHealth.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PhysicalHealth = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Physical Health</Text>
      <Text style={styles.paragraph}>Regular exercise and physical activity are crucial for maintaining a healthy body.</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• Aim for at least 150 minutes of moderate exercise weekly</Text>
        <Text style={styles.listItem}>• Incorporate strength training</Text>
        <Text style={styles.listItem}>• Practice good posture</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 8,
  },
  list: {
    marginTop: 8,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default PhysicalHealth;

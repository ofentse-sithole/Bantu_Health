// src/pages/MentalHealth.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MentalHealth = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mental Health</Text>
      <Text style={styles.paragraph}>Mental health is just as important as physical health. Manage stress and seek support when needed.</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• Practice mindfulness and meditation</Text>
        <Text style={styles.listItem}>• Connect with friends and family</Text>
        <Text style={styles.listItem}>• Seek professional help if necessary</Text>
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

export default MentalHealth;

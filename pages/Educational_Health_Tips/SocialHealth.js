// src/pages/SocialHealth.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SocialHealth = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Social Health</Text>
      <Text style={styles.paragraph}>Strong social connections improve mental and emotional well-being.</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• Build and maintain friendships</Text>
        <Text style={styles.listItem}>• Engage in community activities</Text>
        <Text style={styles.listItem}>• Practice effective communication</Text>
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

export default SocialHealth;

// src/pages/SexualHealth.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SexualHealth = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sexual Health</Text>
      <Text style={styles.paragraph}>
        Understanding sexual health helps promote healthy relationships and informed choices.
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• Practice safe sex</Text>
        <Text style={styles.listItem}>• Know your rights and responsibilities</Text>
        <Text style={styles.listItem}>• Regular check-ups are important</Text>
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

export default SexualHealth;

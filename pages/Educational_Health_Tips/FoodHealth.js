// src/pages/FoodHealth.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FoodHealth = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Food Health</Text>
      <Text style={styles.paragraph}>Nutrition is essential for a healthy life. Focus on balanced diets, whole foods, and hydration.</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• Eat a variety of foods</Text>
        <Text style={styles.listItem}>• Limit sugars and saturated fats</Text>
        <Text style={styles.listItem}>• Stay hydrated</Text>
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

export default FoodHealth;

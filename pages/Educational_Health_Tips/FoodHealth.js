import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';

const FoodHealth = () => {
  const openSANutritionLink = () => {
    Linking.openURL('https://www.nutritionsociety.co.za/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Food Health</Text>
      <Text style={styles.paragraph}>Nutrition is essential for a healthy life. Focus on balanced diets, whole foods, and hydration.</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• Eat a variety of foods including traditional African vegetables</Text>
        <Text style={styles.listItem}>• Limit sugars and saturated fats</Text>
        <Text style={styles.listItem}>• Stay hydrated - aim for 6-8 glasses of water daily</Text>
        <Text style={styles.listItem}>• Include protein-rich foods like beans, lentils, and lean meats</Text>
        <Text style={styles.listItem}>• Choose whole grain pap over refined maize meal</Text>
        <Text style={styles.listItem}>• Eat plenty of locally grown fruits and vegetables</Text>
        <Text style={styles.listItem}>• Reduce salt intake and processed foods</Text>
        <Text style={styles.listItem}>• Include dairy or calcium-rich alternatives</Text>
      </View>
      <TouchableOpacity onPress={openSANutritionLink} style={styles.link}>
        <Text style={styles.linkText}>Visit Nutrition Society of South Africa for more information</Text>
      </TouchableOpacity>
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
  link: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  linkText: {
    color: '#0066cc',
    textAlign: 'center',
    fontSize: 16,
  }
});

export default FoodHealth;

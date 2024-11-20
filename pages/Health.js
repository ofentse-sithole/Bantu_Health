// src/pages/Health.js
import React, { useState } from 'react';
import { StatusBar,View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Navbar from '../components/Navbar/Navbar';
import { Platform } from 'react-native';

const HealthSection = ({ title, children, color }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={[styles.section, { backgroundColor: color }]}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Icon name={expanded ? 'expand-less' : 'expand-more'} size={24} color="#fff" />
      </TouchableOpacity>
      {expanded && <View style={styles.sectionContent}>{children}</View>}
    </View>
  );
};

const Health = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFFFFF"
        translucent={Platform.OS === 'android'}
      />

      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon2 name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>Health Categories</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.imageDescription}>
          Explore various aspects of health, from nutrition to mental well-being.
        </Text>

        <HealthSection title="Food Health" color="#06d6a0">
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/images/food.png')}
              style={styles.image}
            />
          </View>
          <Text>Nutrition is essential for a healthy life. Focus on balanced diets, whole foods, and hydration.</Text>
          <Text>- Eat a variety of foods</Text>
          <Text>- Limit sugars and saturated fats</Text>
          <Text>- Stay hydrated</Text>
        </HealthSection>

        <HealthSection title="Mental Health" color="#ffd166">
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/images/mental.jpg')}
              style={styles.image}
            />
          </View>
          <Text>Mental health is as important as physical health. Manage stress and seek support when needed.</Text>
          <Text>- Practice mindfulness and meditation</Text>
          <Text>- Connect with friends and family</Text>
          <Text>- Seek professional help if necessary</Text>
        </HealthSection>

        <HealthSection title="Physical Health" color="#ef476f">
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/images/physical.jpg')}
              style={styles.image}
            />
          </View>
          <Text>Regular exercise and physical activity are crucial for a healthy body.</Text>
          <Text>- Aim for at least 150 minutes of moderate exercise weekly</Text>
          <Text>- Incorporate strength training</Text>
          <Text>- Practice good posture</Text>
        </HealthSection>

        <HealthSection title="Sexual Health" color="#118ab2">
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/images/sexual.jpg')}
              style={styles.image}
            />
          </View>
          <Text>Understanding sexual health promotes healthy relationships and informed choices.</Text>
          <Text>- Practice safe sex</Text>
          <Text>- Know your rights and responsibilities</Text>
          <Text>- Regular check-ups are important</Text>
        </HealthSection>

        <HealthSection title="Social Health" color="#f58549">
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/images/social.jpg')}
              style={styles.image}
            />
          </View>
          <Text>Strong social connections improve mental and emotional well-being.</Text>
          <Text>- Build and maintain friendships</Text>
          <Text>- Engage in community activities</Text>
          <Text>- Practice effective communication</Text>
        </HealthSection>
      </ScrollView>
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80, // Space for the navbar
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 10, // Space between back button and header
  },
  imageContainer: {
    alignItems: 'center', // Center the image
    marginBottom: 10,
  },
  image: {
    width: 150, // Smaller width
    height: 100, // Adjust height proportionally
    borderRadius: 8,
  },
  imageDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center', // Center the text
  },
  section: {
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#374151',
    fontWeight: '600',
  },
  sectionContent: {
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 10,
  },
});

export default Health;

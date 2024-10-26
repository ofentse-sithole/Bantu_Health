import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  welcomeContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  welcomeGradient: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden', // Prevent content from overflowing the border radius
  },
  
  welcomeHeader: {
    marginBottom: 20,
  },
  timeGreeting: {
    fontSize: 16,
    color: '#E0E0E0',
    fontWeight: '500',
  },
  userName: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 5,
  },
  healthStatusCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
  },
  statusQuestion: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  moodButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 24,
  },
});

const getTimeBasedGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return 'Good morning';
  } else if (currentHour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};

const WelcomeSection = ({ userName, loading }) => (
  <View style={styles.welcomeContainer}>
    <LinearGradient
      colors={['#4e54c8', '#8f94fb']}
      style={styles.welcomeGradient}
    >
      <View style={styles.welcomeContent}>
        <View style={styles.welcomeHeader}>
          <Text style={styles.timeGreeting}>
            {getTimeBasedGreeting()}
          </Text>
          <Text style={styles.userName}>
            {loading ? "Loading..." : userName || "User"}
          </Text>
        </View>
        
        <View style={styles.healthStatusCard}>
          <Text style={styles.statusQuestion}>How are you feeling today?</Text>
          <View style={styles.moodContainer}>
            {['😊', '😐', '😔', '🤒'].map((emoji, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.moodButton}
                onPress={() => console.log(`Mood selected: ${emoji}`)} // Add action for each mood button
                accessibilityLabel={`Mood: ${emoji}`} // Improves accessibility
              >
                <Text style={styles.moodEmoji}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </LinearGradient>
  </View>
);

export default WelcomeSection;

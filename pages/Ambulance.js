import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Ambulance = () => {
  const [countdown, setCountdown] = useState(5);
  const [status, setStatus] = useState('EMERGENCY ACTIVATED');
  const [location, setLocation] = useState(null);
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    startPulseAnimation();
    handleCountdown();
    getLocation();
  }, []);

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleCountdown = () => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          updateStatus();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const updateStatus = () => {
    setTimeout(() => {
      setStatus('FINDING NEAREST EMERGENCY UNIT');
      setTimeout(() => {
        setStatus('EMERGENCY RESPONSE DISPATCHED');
        setTimeout(() => {
          setStatus('HELP IS ON THE WAY');
        }, 3000);
      }, 3000);
    }, 1000);
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Emergency Response</Text>
      </View>

      <View style={styles.mainContent}>
        <Animated.View style={[styles.sosCircle, { transform: [{ scale: pulseAnim }] }]}>
          <MaterialCommunityIcons name="ambulance" size={80} color="#fff" />
        </Animated.View>

        <Text style={styles.countdown}>
          {countdown > 0 ? countdown : ''}
        </Text>

        <Text style={styles.status}>{status}</Text>

        {location && (
          <View style={styles.locationContainer}>
            <MaterialCommunityIcons name="map-marker" size={24} color="#FFD700" />
            <Text style={styles.locationText}>Current Location</Text>
            <Text style={styles.coordinates}>
              {location.coords.latitude.toFixed(4)}°S, {location.coords.longitude.toFixed(4)}°E
            </Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Stay Calm • Help is Coming</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#E32F45',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  countdown: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
  },
  status: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  locationContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '80%',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  locationText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  coordinates: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'monospace',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Ambulance;

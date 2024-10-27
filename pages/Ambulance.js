import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import * as Location from 'expo-location';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Ambulance = () => {
  const [countdown, setCountdown] = useState(5);
  const [status, setStatus] = useState('SOS ACTIVATED');
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
      setStatus('LOCATING NEAREST AMBULANCE');
      setTimeout(() => {
        setStatus('AMBULANCE DISPATCHED');
        setTimeout(() => {
          setStatus('AMBULANCE EN ROUTE');
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
    <View style={styles.container}>
      <Animated.View style={[styles.sosCircle, { transform: [{ scale: pulseAnim }] }]}>
        <MaterialCommunityIcons name="ambulance" size={64} color="#fff" />
      </Animated.View>
      
      <Text style={styles.countdown}>
        {countdown > 0 ? countdown : ''}
      </Text>
      
      <Text style={styles.status}>{status}</Text>
      
      {location && (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>Your Location:</Text>
          <Text style={styles.coordinates}>
            Lat: {location.coords.latitude.toFixed(4)}
          </Text>
          <Text style={styles.coordinates}>
            Long: {location.coords.longitude.toFixed(4)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  sosCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#e32f45',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  countdown: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  status: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  locationContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  locationText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  coordinates: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Ambulance;

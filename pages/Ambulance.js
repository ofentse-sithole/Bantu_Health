import React, { useState, useEffect } from 'react';
import { StatusBar,View, Text, StyleSheet, Animated, Easing, SafeAreaView, TouchableOpacity, Platform, Linking } from 'react-native';
import * as Location from 'expo-location';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { Audio } from 'expo-av';


const Ambulance = () => {
  const navigation = useNavigation();
  const [countdown, setCountdown] = useState(5);
  const [status, setStatus] = useState('EMERGENCY ACTIVATED');
  const [location, setLocation] = useState(null);
  const [showArrivalButton, setShowArrivalButton] = useState(false);
  const pulseAnim = new Animated.Value(1);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    startPulseAnimation();
    handleCountdown();
    getLocation();
    saveEmergencyData();
    playSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./sound/alert.mp3') // Replace with the path to your audio file
    );
    setSound(sound);
    await sound.playAsync();
  };

  // Add this function to save emergency data
  const saveEmergencyData = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user && location) {
      const db = getFirestore();
      const emergencyRef = collection(doc(db, 'users', user.uid), 'emergencies');
      
      const emergencyData = {
        createdAt: new Date(),
        location: {
          coordinates: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          exactCoords: `${location.coords.latitude}°S, ${location.coords.longitude}°E`,
          address: location.address,
        },
        status: status,
        completed: false
      };
  
      try {
        await addDoc(emergencyRef, emergencyData);
        console.log('Emergency data saved successfully with coordinates');
      } catch (error) {
        console.error('Error saving emergency data:', error);
      }
    }
  };



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

  const handleEmergencyCall = () => {
    Linking.openURL('tel:112');
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
          setShowArrivalButton(true);
        }, 3000);
      }, 3000);
    }, 1000);
  };

  const handleArrivalConfirmation = async () => {
    setStatus('EMERGENCY RESPONSE COMPLETED');
    setShowArrivalButton(false);
    pulseAnim.stopAnimation();
    
    // Update the emergency record as completed
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      const db = getFirestore();
      const emergencyRef = collection(doc(db, 'users', user.uid), 'emergencies');
      
      const emergencyData = {
        completedAt: new Date(),
        status: 'COMPLETED'
      };
  
      try {
        await addDoc(emergencyRef, emergencyData);
      } catch (error) {
        console.error('Error updating emergency status:', error);
      }
    }
  
    setTimeout(() => {
      navigation.navigate('Dashboard');
    }, 2000);
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      let address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      
      setLocation({
        coords: location.coords,
        address: address[0]
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar 
      barStyle="dark-content" 
      backgroundColor="#FFFFFF"
      translucent={Platform.OS === 'android'}
    />

      <View style={styles.header}>
        <Text style={styles.headerText}>Emergency Response</Text>
      </View>

      <View style={styles.mainContent}>
        <TouchableOpacity onPress={handleEmergencyCall}>
          <Animated.View style={[styles.sosCircle, { transform: [{ scale: pulseAnim }] }]}>
            <MaterialCommunityIcons name="ambulance" size={80} color="#fff" />
            <Text style={styles.callText}>TAP TO CALL 112</Text>
          </Animated.View>
        </TouchableOpacity>

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
            {location.address && (
              <Text style={styles.addressText}>
                {location.address.street}, {location.address.city}
                {'\n'}
                {location.address.region}, {location.address.country}
              </Text>
            )}
          </View>
        )}

        {showArrivalButton && (
          <TouchableOpacity 
            style={styles.arrivalButton}
            onPress={handleArrivalConfirmation}
          >
            <Text style={styles.arrivalButtonText}>Confirm Arrival</Text>
          </TouchableOpacity>
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
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
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
  callText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
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
  addressText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'monospace',
  },
  arrivalButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    elevation: 5,
  },
  arrivalButtonText: {
    color: '#1A1A1A',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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

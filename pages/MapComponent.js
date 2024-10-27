// components/MapComponent.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const MapComponent = ({ onLocationSelect }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [medicalHotspots, setMedicalHotspots] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const initialRegion = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    const setupMap = async () => {
      try {
        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Location permission denied');
          return;
        }

        // Get current location
        const location = await Location.getCurrentPositionAsync({});
        const currentRegion = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setCurrentLocation(currentRegion);

        // Fetch medical hotspots
        const db = getFirestore();
        const hotspotsSnapshot = await getDocs(collection(db, 'medicalHotspots'));
        const hotspots = [];
        hotspotsSnapshot.forEach((doc) => {
          hotspots.push({ id: doc.id, ...doc.data() });
        });
        setMedicalHotspots(hotspots);
      } catch (error) {
        console.error('Error setting up map:', error);
        setErrorMsg('Error loading map data');
      }
    };

    setupMap();
  }, []);

  const handleMarkerPress = (location) => {
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        region={currentLocation || initialRegion}
        showsUserLocation
        showsMyLocationButton
        apiKey="AIzaSyDLoG0-Xvgtc9_EUCpRXrx2VJ3c1NPjR3w" // Replace with your Google Maps API key
      >
        {medicalHotspots.map((hotspot) => (
          <Marker
            key={hotspot.id}
            coordinate={{ latitude: hotspot.latitude, longitude: hotspot.longitude }}
            title={hotspot.name}
            onPress={() => handleMarkerPress(hotspot)}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
});

export default MapComponent;

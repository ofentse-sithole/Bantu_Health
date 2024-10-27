import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const GOOGLE_API_KEY = 'AIzaSyAsc-PWMl_MI5iSNk9Jt61afWlZLFQ5Dmo';

const REGIONS = [
  { latitude: -26.2041, longitude: 28.0473 }, // Johannesburg
  { latitude: -33.9249, longitude: 18.4241 }, // Cape Town
  { latitude: -25.7479, longitude: 28.2293 }, // Pretoria
  { latitude: -29.8587, longitude: 31.0218 }, // Durban
  { latitude: -25.6107, longitude: 27.7895 }, // Rustenburg
];

const MapComponent = ({ onLocationSelect }) => {
  const [medicalFacilities, setMedicalFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const initialRegion = {
    latitude: -30.5595,
    longitude: 22.9375,
    latitudeDelta: 10,
    longitudeDelta: 10,
  };

  useEffect(() => {
    const getUserLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    };
    getUserLocation();
  }, []);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const allFacilities = [];
        const facilityTypes = ['hospital', 'doctor', 'health'];

        for (const region of REGIONS) {
          for (const type of facilityTypes) {
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${region.latitude},${region.longitude}&radius=50000&type=${type}&key=${GOOGLE_API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.results) {
              const facilities = data.results.map((place) => ({
                id: place.place_id,
                name: place.name,
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
                address: place.vicinity,
                type: type,
                rating: place.rating,
                isOpen: place.opening_hours?.open_now,
              }));
              allFacilities.push(...facilities);
            }
          }
        }

        const uniqueFacilities = Array.from(new Map(allFacilities.map(item => [item.id, item])).values());
        setMedicalFacilities(uniqueFacilities);
      } catch (error) {
        console.error('Error fetching facilities:', error);
        setErrorMsg('Error fetching medical facilities');
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  const getMarkerColor = (type) => {
    switch (type) {
      case 'hospital':
        return '#E32F45';
      case 'doctor':
        return '#2ecc71';
      default:
        return '#3498db';
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#2ecc71" />
      ) : (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={userLocation ? {
            ...userLocation,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          } : initialRegion}
          showsUserLocation
          showsMyLocationButton
        >
          {medicalFacilities.map((facility) => (
            <Marker
              key={`${facility.id}-${facility.type}`}
              coordinate={{
                latitude: facility.latitude,
                longitude: facility.longitude,
              }}
              title={facility.name}
              description={`${facility.address} ${facility.rating ? `| Rating: ${facility.rating}⭐` : ''} ${facility.isOpen ? '| Open' : ''}`}
              onPress={() => onLocationSelect(facility)}
              pinColor={getMarkerColor(facility.type)}
            >
              <MaterialCommunityIcons 
                name={facility.type === 'hospital' ? 'hospital-building' : 'medical-bag'} 
                size={30} 
                color={getMarkerColor(facility.type)}
              />
            </Marker>
          ))}
        </MapView>
      )}
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
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
  error: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
  },
});

export default MapComponent;

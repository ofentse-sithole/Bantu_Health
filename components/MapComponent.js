// components/MapComponent.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const GOOGLE_API_KEY = 'AIzaSyAsc-PWMl_MI5iSNk9Jt61afWlZLFQ5Dmo'; // Replace with your key

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

    const initialRegion = {
        latitude: -30.5595, // South Africa's center latitude
        longitude: 22.9375, // South Africa's center longitude
        latitudeDelta: 10,
        longitudeDelta: 10,
    };

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const allFacilities = [];

                // Fetch facilities for each region
                for (const region of REGIONS) {
                    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${region.latitude},${region.longitude}&radius=50000&type=hospital&key=${GOOGLE_API_KEY}`;
                    const response = await fetch(url);
                    const data = await response.json();

                    if (data.results) {
                        const facilities = data.results.map((place) => ({
                            id: place.place_id,
                            name: place.name,
                            latitude: place.geometry.location.lat,
                            longitude: place.geometry.location.lng,
                            address: place.vicinity,
                        }));
                        allFacilities.push(...facilities);
                    }
                }

                setMedicalFacilities(allFacilities);
            } catch (error) {
                console.error('Error fetching facilities:', error);
                setErrorMsg('Error fetching medical facilities');
            } finally {
                setLoading(false);
            }
        };

        fetchFacilities();
    }, []);

    // Request location permissions
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Location permission not granted');
                return;
            }

            // Get user location
            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
        })();
    }, []);

    const handleMarkerPress = (facility) => {
        if (onLocationSelect) {
            onLocationSelect(facility);
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={initialRegion}
                    showsUserLocation
                    showsMyLocationButton
                >
                    {medicalFacilities.map((facility) => (
                        <Marker
                            key={facility.id}
                            coordinate={{
                                latitude: facility.latitude,
                                longitude: facility.longitude,
                            }}
                            title={facility.name}
                            description={facility.address}
                            onPress={() => handleMarkerPress(facility)}
                        />
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

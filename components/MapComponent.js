import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const GOOGLE_API_KEY = 'AIzaSyAsc-PWMl_MI5iSNk9Jt61afWlZLFQ5Dmo';

const REGIONS = [
    { latitude: -26.2041, longitude: 28.0473 },
    { latitude: -33.9249, longitude: 18.4241 },
    { latitude: -25.7479, longitude: 28.2293 },
    { latitude: -29.8587, longitude: 31.0218 },
    { latitude: -25.6107, longitude: 27.7895 },
    { latitude: -31.6326, longitude: 28.5306 },
    { latitude: -30.675, longitude: 23.0418 },
    { latitude: -26.874, longitude: 29.2494 },
    { latitude: -24.1944, longitude: 29.0097 },
    { latitude: -29.6663, longitude: 27.2317 },
    { latitude: -30.874, longitude: 27.4708 },
    { latitude: -32.9468, longitude: 27.7013 },
    { latitude: -30.0097, longitude: 29.0097 },
    { latitude: -29.8587, longitude: 31.0218 },
    
    
];

const MapComponent = ({ onLocationSelect }) => {
    const [medicalFacilities, setMedicalFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);

    const initialRegion = {
        latitude: -30.5595,
        longitude: 22.9375,
        latitudeDelta: 10,
        longitudeDelta: 10,
    };

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const allFacilities = [];

                for (const region of REGIONS) {
                    // Fetch hospitals
                    const hospitalUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${region.latitude},${region.longitude}&radius=50000&type=hospital&key=${GOOGLE_API_KEY}`;
                    const hospitalResponse = await fetch(hospitalUrl);
                    const hospitalData = await hospitalResponse.json();

                    // Fetch clinics
                    const clinicUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${region.latitude},${region.longitude}&radius=50000&keyword=clinic&type=health&key=${GOOGLE_API_KEY}`;
                    const clinicResponse = await fetch(clinicUrl);
                    const clinicData = await clinicResponse.json();

                    // Process hospitals
                    if (hospitalData.results) {
                        const hospitals = hospitalData.results.map((place) => ({
                            id: place.place_id,
                            name: place.name,
                            latitude: place.geometry.location.lat,
                            longitude: place.geometry.location.lng,
                            address: place.vicinity,
                            type: 'hospital'
                        }));
                        allFacilities.push(...hospitals);
                    }

                    // Process clinics
                    if (clinicData.results) {
                        const clinics = clinicData.results.map((place) => ({
                            id: place.place_id,
                            name: place.name,
                            latitude: place.geometry.location.lat,
                            longitude: place.geometry.location.lng,
                            address: place.vicinity,
                            type: 'clinic'
                        }));
                        allFacilities.push(...clinics);
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

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Location permission not granted');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
        })();
    }, []);

    const getMarkerColor = (type) => {
        return type === 'hospital' ? 'red' : 'blue';
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
                            pinColor={getMarkerColor(facility.type)}
                            onPress={() => onLocationSelect && onLocationSelect(facility)}
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

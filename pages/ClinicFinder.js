import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapComponent from './pages/Maps/MapComponent'; // Your MapComponent
import Tabs from '../components/Navbar/Navbar'; // Your Tabs component

const ClinicFinder = () => {
    return (
        <View style={styles.container}>
            <MapComponent />
            <Tabs />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Full screen layout
    },
});

export default ClinicFinder;

// ClinicFinder.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

// Importing components
import Navbar from "./pages/Navbar/Navbar.js";
import MapComponent from "./MapComponent";

const ClinicFinder = () => {
    return (
        <View style={styles.container}>
            <MapComponent />
            <Navbar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});

export default ClinicFinder;

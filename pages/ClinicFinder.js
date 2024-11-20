// ClinicFinder.js
import React from 'react';
import { StatusBar,View, StyleSheet } from 'react-native';
import { Platform } from 'react-native';


// Importing components
import Navbar from '../components/Navbar/Navbar';
import MapComponent from "../components/MapComponent";

const ClinicFinder = () => {
    return (
        <View style={styles.container}>
            <StatusBar 
                barStyle="dark-content" 
                backgroundColor="#FFFFFF"
                translucent={Platform.OS === 'android'}
            />
            <MapComponent />
            <Navbar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
});

export default ClinicFinder;

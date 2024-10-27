import React from 'react';
import MapComponent from "./MapComponent"; // Now treated as a view
import { View } from 'react-native';

const ClinicFinder = () => {


    return (
        <View>
            <MapComponent />
            <MedicalHotspots />
            <Navbar />
        </View>
    );
};

export default ClinicFinder;
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Platform, Dimensions } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const SplashScreenComponent = () => {
    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();  // Hides the native splash screen after 3 seconds
        }, 3000);
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/logo-removebg-preview.png')} // Place your splash image here
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.text}>from PixelElite</Text>
        </View>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    image: {
        width: width * 0.9,  // Responsive width (60% of the screen width)
        height: height * 0.5, // Responsive height (30% of the screen height)
        marginBottom: 20,
    },
    text: {
        fontSize: 15,
        color: '#888',
        position: 'absolute',
        bottom: 30,
        paddingHorizontal: 10,
        textAlign: 'center',
    },
});

export default SplashScreenComponent;

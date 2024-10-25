import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreenComponent = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            // Navigate to the Login screen after 3 seconds
            navigation.replace('Login');
        }, 3000);

        return () => clearTimeout(timer);  // Cleanup the timer on unmount
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/logo-preview.png')} // Replace with your image path
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
        width: width * 0.9,  // Responsive width (90% of the screen width)
        height: height * 0.5, // Responsive height (50% of the screen height)
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

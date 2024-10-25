// pages/settings/About.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const About = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>About Us</Text>
            <Text style={styles.content}>
                Bantu Health is a revolutionary health app that empowers users by providing
                instant medical diagnosis using cutting-edge AI technology. Our app is
                designed to offer quick and accurate insights based on symptoms you input,
                allowing you to make informed decisions about your health.
            </Text>
            <Text style={styles.content}>
                With features such as an emergency button for immediate assistance and a
                built-in map to help you locate nearby hospitals, our goal is to improve
                access to critical health services. Bantu Health is not a replacement for
                professional medical advice, but a tool to aid in your health journey by
                offering suggestions, recommendations, and emergency support.
            </Text>
            <Text style={styles.content}>
                We aim to bridge the gap between health resources and the people who need
                them, ensuring that you have support, whether you are monitoring symptoms
                or facing an emergency.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
    },
});

export default About;
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const About = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.title}>About Us</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.content}>
                        Bantu Health is a revolutionary health app that empowers users by providing
                        instant medical diagnosis using cutting-edge AI technology. Our app is
                        designed to offer quick and accurate insights based on symptoms you input,
                        allowing you to make informed decisions about your health.
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.content}>
                        With features such as an emergency button for immediate assistance and a
                        built-in map to help you locate nearby hospitals, our goal is to improve
                        access to critical health services. Bantu Health is not a replacement for
                        professional medical advice, but a tool to aid in your health journey by
                        offering suggestions, recommendations, and emergency support.
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.content}>
                        We aim to bridge the gap between health resources and the people who need
                        them, ensuring that you have support, whether you are monitoring symptoms
                        or facing an emergency.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f4f4f8',
    },
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        padding: 10,
        marginRight: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    content: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        textAlign: 'justify',
    },
});

export default About;

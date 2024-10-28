// pages/TermsOfUse.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const TermsOfUse = () => {
    const navigation = useNavigation(); // Use the hook to get navigation

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Terms of Use</Text>
                </View>

                <Text style={styles.date}>Effective Date: 24 October 2024</Text>

                <View style={styles.card}>
                    <Text style={styles.content}>
                        Welcome to Bantu Health. By using our app, you agree to comply with the following
                        terms and conditions:
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.subTitle}>1. Health Information Disclaimer</Text>
                    <Text style={styles.content}>
                        The health-related information provided by our app is powered by AI and is
                        meant for informational purposes only. It does not constitute medical advice,
                        diagnosis, or treatment. Always consult with a licensed healthcare provider
                        before making any decisions based on the app’s suggestions.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.subTitle}>2. Emergency Button</Text>
                    <Text style={styles.content}>
                        The emergency button in the app is designed to quickly alert emergency
                        services. By pressing the button, you agree that the app may share your
                        location and other relevant health data with medical responders.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.subTitle}>3. Location Services</Text>
                    <Text style={styles.content}>
                        The app uses location data to help you find nearby hospitals. You agree to allow
                        the app access to your location for this feature. You can turn off location
                        services, but some features may not function correctly without it.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.subTitle}>4. User Accounts</Text>
                    <Text style={styles.content}>
                        You are responsible for maintaining the confidentiality of your account
                        credentials and are fully responsible for all activities that occur under your
                        account. You agree to immediately notify us of any unauthorized use of your
                        account.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.subTitle}>5. Prohibited Uses</Text>
                    <Text style={styles.content}>
                        You agree not to:
                    </Text>
                    <Text style={styles.bullet}>• Use the app for any unlawful purposes.</Text>
                    <Text style={styles.bullet}>• Interfere with the app’s functionality or security features.</Text>
                    <Text style={styles.bullet}>• Submit false or misleading information, especially regarding health symptoms.</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.subTitle}>6. Limitation of Liability</Text>
                    <Text style={styles.content}>
                        Bantu Health is not liable for any damages arising out of or in connection with
                        the use or inability to use the app, including any health-related issues or
                        emergency situations. Use of the app is at your own risk.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.subTitle}>7. Changes to Terms</Text>
                    <Text style={styles.content}>
                        We reserve the right to modify these terms at any time. Continued use of the
                        app following any changes indicates your acceptance of the updated terms.
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
    date: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
        textAlign: 'center',
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
    subTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        textAlign: 'justify',
    },
    bullet: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginLeft: 10,
        marginBottom: 10,
    },
});

export default TermsOfUse;

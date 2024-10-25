// pages/TermsOfUse.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TermsOfUse = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Terms of Use</Text>
            <Text style={styles.content}>
                Effective Date: 24 October 2024
            </Text>
            <Text style={styles.content}>
                Welcome to Bantu Health. By using our app, you agree to comply with the following
                terms and conditions:
            </Text>

            <Text style={styles.subTitle}>1. Health Information Disclaimer</Text>
            <Text style={styles.content}>
                The health-related information provided by our app is powered by AI and is
                meant for informational purposes only. It does not constitute medical advice,
                diagnosis, or treatment. Always consult with a licensed healthcare provider
                before making any decisions based on the app’s suggestions.
            </Text>

            <Text style={styles.subTitle}>2. Emergency Button</Text>
            <Text style={styles.content}>
                The emergency button in the app is designed to quickly alert emergency
                services. By pressing the button, you agree that the app may share your
                location and other relevant health data with medical responders.
            </Text>

            <Text style={styles.subTitle}>3. Location Services</Text>
            <Text style={styles.content}>
                The app uses location data to help you find nearby hospitals. You agree to allow
                the app access to your location for this feature. You can turn off location
                services, but some features may not function correctly without it.
            </Text>

            <Text style={styles.subTitle}>4. User Accounts</Text>
            <Text style={styles.content}>
                You are responsible for maintaining the confidentiality of your account
                credentials and are fully responsible for all activities that occur under your
                account. You agree to immediately notify us of any unauthorized use of your
                account.
            </Text>

            <Text style={styles.subTitle}>5. Prohibited Uses</Text>
            <Text style={styles.content}>
                You agree not to:
            </Text>
            <Text style={styles.bullet}>- Use the app for any unlawful purposes.</Text>
            <Text style={styles.bullet}>- Interfere with the app’s functionality or security features.</Text>
            <Text style={styles.bullet}>- Submit false or misleading information, especially regarding health symptoms.</Text>

            <Text style={styles.subTitle}>6. Limitation of Liability</Text>
            <Text style={styles.content}>
                Bantu Health is not liable for any damages arising out of or in connection with
                the use or inability to use the app, including any health-related issues or
                emergency situations. Use of the app is at your own risk.
            </Text>

            <Text style={styles.subTitle}>7. Changes to Terms</Text>
            <Text style={styles.content}>
                We reserve the right to modify these terms at any time. Continued use of the
                app following any changes indicates your acceptance of the updated terms.
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
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
    },
    bullet: {
        fontSize: 16,
        lineHeight: 24,
        marginLeft: 10,
        marginBottom: 10,
    },
});

export default TermsOfUse;
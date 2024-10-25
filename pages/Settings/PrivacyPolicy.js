// pages/PrivacyPolicy.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PrivacyPolicy = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Privacy Policy</Text>
            <Text style={styles.content}>
                Effective Date: 24 October 2024
            </Text>
            <Text style={styles.content}>
                At Bantu Health, we are committed to protecting your privacy. This policy
                explains how we collect, use, and disclose your information when you use
                our services.
            </Text>

            <Text style={styles.subTitle}>1. Information We Collect</Text>
            <Text style={styles.content}>
                We collect information to provide better services to all of our users. This
                includes:
            </Text>
            <Text style={styles.bullet}>- Personal Information: Your name, email address, and other information you may choose to provide when setting up an account.</Text>
            <Text style={styles.bullet}>- Health Information: Symptoms and medical conditions you input to receive AI-powered diagnosis suggestions.</Text>
            <Text style={styles.bullet}>- Location Data: Your current location to show nearby hospitals and for emergency services.</Text>
            <Text style={styles.bullet}>- Usage Data: We collect information about how you use the app, including features accessed, time spent, etc.</Text>

            <Text style={styles.subTitle}>2. How We Use Your Information</Text>
            <Text style={styles.content}>
                We use the information collected to:
            </Text>
            <Text style={styles.bullet}>- Provide AI-based health diagnoses.</Text>
            <Text style={styles.bullet}>- Enhance user experience and improve app functionality.</Text>
            <Text style={styles.bullet}>- Display nearby hospitals based on your location.</Text>
            <Text style={styles.bullet}>- Enable emergency response by providing critical data to healthcare providers.</Text>

            <Text style={styles.subTitle}>3. Data Security</Text>
            <Text style={styles.content}>
                We take reasonable measures to protect your data from unauthorized access. All
                sensitive information is encrypted and securely stored. However, no security
                system is 100% foolproof, and we cannot guarantee the absolute security of your
                data.
            </Text>

            <Text style={styles.subTitle}>4. Your Rights</Text>
            <Text style={styles.content}>
                You have the right to access, update, or delete your personal information at any
                time. For any requests, please contact us at [Support Email].
            </Text>

            <Text style={styles.subTitle}>5. Updates to This Policy</Text>
            <Text style={styles.content}>
                We may update this Privacy Policy from time to time. We will notify you of
                significant changes by posting the new policy on this page.
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

export default PrivacyPolicy;
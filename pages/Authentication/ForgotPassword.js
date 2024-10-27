// pages/Authentication/ForgotPassword.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePasswordReset = async () => {
        if (!email) {
            Toast.show({ type: 'error', text1: 'Please enter your email address' });
            return;
        }

        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            Toast.show({
                type: 'success',
                text1: 'Password reset email sent!',
                text2: 'Check your inbox to reset your password.',
            });
            navigation.navigate('Login'); // Redirect to Login after sending the email
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Error', text2: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={20} color="#333" />
            </TouchableOpacity>

            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>
                Enter your email below, and we’ll send you instructions to reset your password.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <TouchableOpacity style={styles.resetButton} onPress={handlePasswordReset} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.resetButtonText}>Send Reset Email</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    resetButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    resetButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }, 
    backButton: {
        position: 'absolute',
        top: 35,
        left: 25,
        padding: 10,
        zIndex: 1,
    },
});

export default ForgotPassword;

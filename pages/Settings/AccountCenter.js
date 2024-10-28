import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { auth, firestore } from '../../firebaseConfig'; // Adjust the path based on your project structure
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import Icon here

const AccountCenter = ({ navigation }) => { // Added navigation as a prop
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [userId, setUserId] = useState(null);

    // Fetch user data from Firestore
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                fetchData(user.uid);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchData = async (uid) => {
        try {
            const userDoc = await getDoc(doc(firestore, 'users', uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setName(userData.name);
                setSurname(userData.surname);
                setEmail(user.email);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to load user data.');
        } finally {
            setLoading(false);
        }
    };

    // Function to update user data in Firestore and Authentication
    const handleSaveChanges = async () => {
        try {
            setLoading(true);

            // Update Firestore with name and surname
            await updateDoc(doc(firestore, 'users', userId), {
                name,
                surname,
            });

            // Update Firebase Authentication email and password if changed
            const user = auth.currentUser;
            if (email !== user.email) {
                await user.updateEmail(email);
            }
            if (password) {
                await user.updatePassword(password);
            }

            Alert.alert('Success', 'Your account information has been updated successfully.');
        } catch (error) {
            Alert.alert('Update Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={20} color="#333" />
            </TouchableOpacity>

            <Text style={styles.header}>Account Center</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Surname</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your surname"
                value={surname}
                onChangeText={setSurname}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter a new password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f6f9',
    },
    header: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 25,
        color: '#333',
    },
    label: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
        fontWeight: '600',
    },
    input: {
        height: 45,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        color: '#333',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 2,
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: "#007bff",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f6f9',
    },
    backButton: {
        position: 'absolute',
        top: 35,
        left: 25,
        padding: 10,
        zIndex: 1,
    },
});

export default AccountCenter;

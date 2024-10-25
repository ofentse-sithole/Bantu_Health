import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth, db } from '../firebase';

const AccountScreen = () => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        // Fetch user info from Firebase Auth
        const currentUser = auth.currentUser;
        setUser(currentUser);

        // Fetch username from Firestore
        if (currentUser) {
            const uid = currentUser.uid;
            const userRef = db.collection('users').doc(uid);
            userRef.get().then((doc) => {
                if (doc.exists) {
                    setUsername(doc.data().username);
                }
            });
        }
    }, []);

    const handleChangePassword = () => {
        if (newPassword) {
            user.updatePassword(newPassword).then(() => {
                alert('Password updated successfully');
            }).catch((error) => {
                alert(error.message);
            });
        } else {
            alert('Please enter a new password');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            {user && (
                <>
                    <Text style={styles.label}>Email: {user.email}</Text>
                    <Text style={styles.label}>Username: {username}</Text>

                    <TextInput
                        placeholder="New Password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                        style={styles.input}
                    />
                    <Button title="Change Password" onPress={handleChangePassword} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

export default AccountScreen;
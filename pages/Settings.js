// Settings.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import Navbar from './Navbar/Navbar.js';

const Settings = () => {
    const navigation = useNavigation(); // Hook for navigation

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.header}>Settings and activity</Text>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor="#888"
                        style={styles.searchInput}
                    />
                </View>

                {/* Your Account Section */}
                <Text style={styles.sectionTitle}>Your account</Text>
                <TouchableOpacity
                    style={styles.option}
                    onPress={() => navigation.navigate('AccountsCenter')}
                >
                    <Icon name="user-cog" size={20} color="#000" style={styles.optionIcon} />
                    <View style={styles.optionTextContainer}>
                        <Text style={styles.optionTitle}>Accounts Center</Text>
                        <Text style={styles.optionDescription}>Password, security, personal details, ad preferences</Text>
                    </View>
                    <Icon name="chevron-right" size={15} color="#000" />
                </TouchableOpacity>

                {/* How you use the app Section */}
                <Text style={styles.sectionTitle}>How you use the app</Text>
                {renderOption("info-circle", "About", "About", navigation)}
                {renderOption("file-alt", "Privacy Policy", "PrivacyPolicy", navigation)}
                {renderOption("file-contract", "Terms of Use", "TermsOfUse", navigation)}
            </ScrollView>

            {/* Navbar fixed at the bottom */}
            <Navbar style={styles.navbar} />
        </View>
    );
};

// Helper function to render each option with navigation
const renderOption = (iconName, title, routeName, navigation) => (
    <TouchableOpacity style={styles.option} onPress={() => navigation.navigate(routeName)}>
        <Icon name={iconName} size={20} color="#000" style={styles.optionIcon} />
        <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>{title}</Text>
        </View>
        <Icon name="chevron-right" size={15} color="#000" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        paddingHorizontal: 16,
        marginTop: 35,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        paddingVertical: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        color: '#000',
        paddingVertical: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 10,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    optionIcon: {
        marginRight: 15,
    },
    optionTextContainer: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 16,
        color: '#000',
    },
    optionDescription: {
        fontSize: 12,
        color: '#000',
    },
    navbar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default Settings;

// Settings.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Settings = () => {
    return (
        <ScrollView style={styles.container}>
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
            <TouchableOpacity style={styles.option}>
                <Icon name="user-cog" size={20} color="#888" style={styles.optionIcon} />
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionTitle}>Accounts Center</Text>
                    <Text style={styles.optionDescription}>Password, security, personal details, ad preferences</Text>
                </View>
                <Icon name="chevron-right" size={15} color="#888" />
            </TouchableOpacity>

            {/* How you use [App Name] Section */}
            <Text style={styles.sectionTitle}>How you use the app</Text>
            {renderOption("bookmark", "Saved")}
            {renderOption("archive", "Archive")}
            {renderOption("history", "Your activity")}
            {renderOption("bell", "Notifications")}
            {renderOption("clock", "Time management")}

            {/* Who can see your content Section */}
            <Text style={styles.sectionTitle}>Who can see your content</Text>
            {renderOption("user-lock", "Account privacy", "Private")}

            {/* Additional sections as needed */}
        </ScrollView>
    );
};

// Helper function to render each option
const renderOption = (iconName, title, rightText) => (
    <TouchableOpacity style={styles.option}>
        <Icon name={iconName} size={20} color="#888" style={styles.optionIcon} />
        <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>{title}</Text>
            {rightText && <Text style={styles.rightText}>{rightText}</Text>}
        </View>
        <Icon name="chevron-right" size={15} color="#888" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Dark background for night mode
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        paddingVertical: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#222',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        color: '#fff',
        paddingVertical: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#888',
        marginVertical: 10,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    optionIcon: {
        marginRight: 15,
    },
    optionTextContainer: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 16,
        color: '#fff',
    },
    optionDescription: {
        fontSize: 12,
        color: '#888',
    },
    rightText: {
        fontSize: 12,
        color: '#888',
    },
});

export default Settings;

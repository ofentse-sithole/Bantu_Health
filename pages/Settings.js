import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Navbar from '../components/Navbar/Navbar.js';

const { width } = Dimensions.get('window');

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

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('AccountCenter')}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
  },
});

export default Settings;
import React from 'react';
import { TextInput, View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Navbar from '../components/Navbar/Navbar.js';

const { width } = Dimensions.get('window');

const Settings = () => {
  const navigation = useNavigation(); // Hook for navigation

  // Define renderOption function
  const renderOption = (iconName, title, routeName) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => navigation.navigate(routeName)}>
      <Icon name={iconName} size={20} color="#4B5563" style={styles.optionIcon} />
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionTitle}>{title}</Text>
      </View>
      <Icon name="chevron-right" size={15} color="#4B5563" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 80 }}>
          <Text style={styles.header}>Settings</Text>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
            />
          </View>

          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('AccountCenter')}>
            <Icon name="user-cog" size={20} color="#4B5563" style={styles.optionIcon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Accounts Center</Text>
              <Text style={styles.optionDescription}>Manage password, security, personal details</Text>
            </View>
            <Icon name="chevron-right" size={15} color="#4B5563" />
          </TouchableOpacity>

          {/* How you use the app Section */}
          <Text style={styles.sectionTitle}>How you use the app</Text>
          {renderOption("info-circle", "About", "About")}
          {renderOption("file-alt", "Privacy Policy", "PrivacyPolicy")}
          {renderOption("file-contract", "Terms of Use", "TermsOfUse")}
        </ScrollView>

        {/* Navbar fixed at the bottom */}
        <Navbar style={styles.navbar} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginVertical: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    padding: 10,
    marginVertical: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: '#F9FAFB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  optionTitle: {
    fontSize: 18,
    color: '#374151',
    fontWeight: '600',
  },
  optionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#4B5563',
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    width: width,
  },
});

export default Settings;

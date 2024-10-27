import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Navbar from './Navbar/Navbar.js';

const { width } = Dimensions.get('window');

const Settings = () => {
  const navigation = useNavigation();

  const renderOption = (iconName, title, route) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => navigation.navigate(route)}
    >
      <Icon name={iconName} size={width * 0.06} color="#333" />
      <Text style={styles.optionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Spacer Header */}
      <View style={styles.spacer} />

      <ScrollView contentContainerStyle={styles.scrollView}>
        {renderOption("user", "Profile", "Profile")}
        {renderOption("bell", "Notifications", "Notifications")}
        {renderOption("shield-alt", "Security", "Security")}
        {renderOption("question-circle", "Help & Support", "Support")}
        {renderOption("file-alt", "Privacy Policy", "PrivacyPolicy")}
        {renderOption("file-contract", "Terms of Use", "TermsOfUse")}
      </ScrollView>
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  spacer: {
    height: width * 0.1,  // Adjust the height for desired spacing
  },
  scrollView: {
    padding: width * 0.05,
    paddingBottom: width * 0.2,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    marginLeft: width * 0.04,
    fontSize: width * 0.045,
    color: '#333',
  },
});

export default Settings;

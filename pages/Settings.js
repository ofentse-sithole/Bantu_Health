import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Navbar from '../components/Navbar/Navbar.js';

const Settings = () => {
  const navigation = useNavigation();

  const renderOption = (iconName, title, route) => (
    <TouchableOpacity 
      style={styles.option}
      onPress={() => navigation.navigate(route)}
    >
      <Icon name={iconName} size={20} color="#333" />
      <Text style={styles.optionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {renderOption("user", "Profile", "Profile")}
        {renderOption("bell", "Notifications", "Notifications")}
        {renderOption("shield-alt", "Security", "Security")}
        {renderOption("question-circle", "Help & Support", "Support")}
        {renderOption("file-alt", "Privacy Policy", "PrivacyPolicy")}
        {renderOption("file-contract", "Terms of Use", "TermsOfUse")}
      </ScrollView>
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

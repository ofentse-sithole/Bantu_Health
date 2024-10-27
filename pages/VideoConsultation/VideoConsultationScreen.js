import React, { useState } from 'react';
import { Platform, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import DoctorSelection from './components/DoctorSelection';
import ConsultationList from './components/ConsultationList';

const VideoConsultationScreen = ({ navigation }) => {
  const [activeConsultation, setActiveConsultation] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleStartConsultation = (doctor) => {
    setSelectedDoctor(doctor);
    setActiveConsultation({
      id: Date.now().toString(),
      roomId: `bantuhealth-consultation-${Date.now()}`,
      doctorName: doctor.name,
    });
  };

  const handleEndCall = () => {
    setActiveConsultation(null);
    setSelectedDoctor(null);
    navigation.goBack();
  };

  if (activeConsultation) {
    const domain = 'meet.jit.si';
    const url = `https://${domain}/${activeConsultation.roomId}`;

    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: url }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback={true}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DoctorSelection
        doctors={[
          {
            id: '1',
            name: 'John Smith',
            specialization: 'General Practitioner',
            availableSlots: 5,
            profileImage: 'https://example.com/doctor1.jpg'
          },
          // Add more doctors as needed
        ]}
        onSelectDoctor={handleStartConsultation}
      />
      <ConsultationList
        consultations={[
          {
            id: '1',
            doctorName: 'Dr. John Smith',
            dateTime: new Date(),
            status: 'Scheduled'
          },
          // Add more consultations as needed
        ]}
        onSelectConsultation={setActiveConsultation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  webview: {
    flex: 1,
  }
});

export default VideoConsultationScreen;

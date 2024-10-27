import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DoctorSelection from './components/DoctorSelection';
import ConsultationList from './components/ConsultationList';
import ConsultationRoom from './components/ConsultationRoom';

const VideoConsultationScreen = ({ navigation }) => {
  const [activeConsultation, setActiveConsultation] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleStartConsultation = (doctor) => {
    setSelectedDoctor(doctor);
    setActiveConsultation({
      id: Date.now().toString(),
      roomId: `consultation-${Date.now()}`,
      doctorName: doctor.name,
    });
  };

  const handleEndCall = () => {
    setActiveConsultation(null);
    setSelectedDoctor(null);
    navigation.goBack();
  };

  if (activeConsultation) {
    return (
      <ConsultationRoom
        roomId={activeConsultation.roomId}
        participantName="Patient Name"
        onEndCall={handleEndCall}
      />
    );
  }

  return (
    <View style={styles.container}>
      <DoctorSelection
        doctors={[]} // Add your doctors data here
        onSelectDoctor={handleStartConsultation}
      />
      <ConsultationList
        consultations={[]} // Add your consultations data here
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
});

export default VideoConsultationScreen;


import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import JitsiMeet, { JitsiMeetView } from '@jitsi/react-native-sdk';

const ConsultationRoom = ({ roomId, participantName, onEndCall }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const jitsiMeetProps = {
    roomName: roomId,
    displayName: participantName,
    audioMuted: isMuted,
    videoMuted: !isVideoEnabled,
    onConferenceTerminated: onEndCall,
  };

  return (
    <View style={styles.container}>
      <JitsiMeetView
        style={styles.jitsiView}
        options={jitsiMeetProps}
      />
      <View style={styles.controls}>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => setIsMuted(!isMuted)}
        >
          <Text style={styles.controlText}>
            {isMuted ? 'Unmute' : 'Mute'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => setIsVideoEnabled(!isVideoEnabled)}
        >
          <Text style={styles.controlText}>
            {isVideoEnabled ? 'Disable Video' : 'Enable Video'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.controlButton, styles.endCall]}
          onPress={onEndCall}
        >
          <Text style={styles.controlText}>End Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  jitsiView: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#000',
  },
  controlButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#333',
  },
  endCall: {
    backgroundColor: '#FF3B30',
  },
  controlText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ConsultationRoom;

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const ConsultationRoom = ({ roomId, participantName, onEndCall }) => {
  const domain = 'meet.jit.si';
  const url = `https://${domain}/${roomId}`;

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
      <View style={styles.controls}>
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
  webview: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  controlButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#333',
  },
  endCall: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 30,
  },
  controlText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ConsultationRoom;

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ConsultationRoom = ({ roomId, onEndCall }) => {
  const [username, setUsername] = useState('User');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const domain = 'meet.jit.si';
  const consultationUrl = `https://${domain}/${roomId}#userInfo.displayName="${username}"&config.prejoinPageEnabled=false`;

  const saveConsultationUrl = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();

    if (user) {
      const bookingRef = doc(db, 'users', user.uid, 'bookings', roomId);
      await updateDoc(bookingRef, {
        consultationUrl: consultationUrl,
        updatedAt: new Date(),
        status: 'active'
      });
    }
  };

  useEffect(() => {
    const fetchUsername = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          const db = getFirestore();
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUsername(userData.userName || 'User');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUsername();
    saveConsultationUrl();
  }, []);

  const injectedJavaScript = `
    const domain = '${domain}';
    const options = {
      roomName: '${roomId}',
      width: '100%',
      height: '100%',
      parentNode: document.querySelector('body'),
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
          'fodeviceselection', 'hangup', 'profile', 'chat',
          'livestreaming', 'raisehand', 'videoquality', 'filmstrip',
          'tileview', 'videobackgroundblur'
        ],
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        DEFAULT_BACKGROUND: '#1a1a1a',
        DEFAULT_REMOTE_DISPLAY_NAME: 'Patient',
        TOOLBAR_ALWAYS_VISIBLE: false,
      },
    };
    const api = new JitsiMeetExternalAPI(domain, options);
  `;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <View style={styles.header}>
        <Text style={styles.roomInfo}>Room: {roomId}</Text>
        <TouchableOpacity 
          style={styles.fullscreenButton}
          onPress={() => setIsFullscreen(!isFullscreen)}
        >
          <Icon name={isFullscreen ? "fullscreen-exit" : "fullscreen"} size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <WebView
        source={{ uri: consultationUrl }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        injectedJavaScript={injectedJavaScript}
      />

      <View style={styles.controlsContainer}>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton}>
            <Icon name="microphone" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <Icon name="video" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.endCall]}
            onPress={onEndCall}
          >
            <Icon name="phone-hangup" size={28} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton}>
            <Icon name="message-text" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton}>
            <Icon name="dots-horizontal" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  roomInfo: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  fullscreenButton: {
    padding: 8,
  },
  webview: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  controlsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2D3748',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCall: {
    backgroundColor: '#E53E3E',
    width: 60,
    height: 60,
    borderRadius: 30,
  }
});

export default ConsultationRoom;

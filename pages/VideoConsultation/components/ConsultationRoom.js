import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const ConsultationRoom = ({ roomId, onEndCall }) => {
  const [username, setUsername] = useState('User'); // Default username

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
          } else {
            console.log('No user data found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.log('No user is signed in');
      }
    };

    fetchUsername();
  }, []);

  const domain = 'meet.jit.si';
  const url = `https://${domain}/${roomId}#userInfo.displayName="${username}"&config.prejoinPageEnabled=false`;

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
          'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
          'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
          'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
          'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone'
        ],
      },
    };
    const api = new JitsiMeetExternalAPI(domain, options);
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: url }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        injectedJavaScript={injectedJavaScript}
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

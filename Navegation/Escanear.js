import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handlePress = () => {
    if (hasPermission === null) {
      return;
    } else if (hasPermission === false) {
      return;
    } else {
      setIsCameraVisible(true);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  if (isCameraVisible) {
    return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={takePicture} style={styles.button} />
          </View>
        </Camera>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#35D6ED', '#65DDEF', '#7AE5F5', '#97E8F4', '#C9F6FF', '#DCFFFF']}
      style={styles.container}
    >
      <TouchableOpacity style={styles.cameraButton} onPress={handlePress}>
        <MaterialIcons name="photo-camera" size={64} color="white" />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    backgroundColor: '#124699',
    borderRadius: 50,
    padding: 16,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});

import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const isFocused = useIsFocused();
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const asset = await MediaLibrary.createAssetAsync(data.uri);
      await MediaLibrary.createAlbumAsync('MyApp', asset, false);
      console.log('Photo saved', asset.uri);
    }
  };

  if (hasPermission === null) {
    return null;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera style={styles.camera} type={type} ref={cameraRef} ratio="16:9">
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={takePicture} style={styles.button}>
              <MaterialCommunityIcons name="scan-helper" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 100,
    justifyContent: 'center',
    alignItems: 'flex-end', 
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#545454',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

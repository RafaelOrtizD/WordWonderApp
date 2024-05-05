import React, {useCallback} from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

const CustomAlert = ({ visible, message, onClose }) => {

  const [fontsLoaded] = useFonts({
    black: require('../assets/fonts/Poppins/Poppins-Black.ttf'),
    bold: require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    medium: require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
    regular: require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    semiBold: require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Questrial': require('../assets/fonts/Questrial-Regular.ttf'),
    'Genova-Black': require('../assets/fonts/Genova/Genova-Black.otf'),
    'Genova-Medium': require('../assets/fonts/Genova/Genova-Medium.otf'),
    'Gatha-SemiBold': require('../assets/fonts/Gatha/ZTGatha-SemiBold.ttf'),
  });
  
  const onLayoutRootView = useCallback(async ()=>{
    if(fontsLoaded){
      await SplashScreen.hideAsync();
    }
  },[fontsLoaded]);
  
  if(!fontsLoaded){
    return null
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.mainContainer}>
        <View style={styles.alertContainer}>
          <Icon name="info-circle" size={40} color="#900" style={styles.iconStyle} />
          <Text style={styles.alertText}>{message}</Text>
          <TouchableOpacity onPress={onClose}>
            <LinearGradient colors={['#2D388A','#00AEEF']} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  alertContainer: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  alertText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Questrial',
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Questrial',
  },
  iconStyle: {
    marginBottom: 10,
    margin: 5,
  },
});

export default CustomAlert;

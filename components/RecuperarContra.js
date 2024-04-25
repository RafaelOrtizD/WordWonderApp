import { StatusBar } from 'expo-status-bar';
import React,  {useState} from 'react';
import { TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View, TextInput, Dimensions, Image } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import ButtonGradient from './ButtonGradient';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const { width, height } = Dimensions.get('window')
 
 
function SvgTop() {
  return (
    <View style={styles.containerSVG}>
      <Svg
        width={500}
        height={324}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M297.871 315.826c73.405 13.896 165.338-13.964 202.129-29.63V230H1.326v63.5c69.15-42.913 204.789 4.957 296.545 22.326z"
          fill="url(#prefix__paint0_linear_103:6)"
          fillOpacity={0.7}
        />
        <Path
          d="M237.716 308.627C110.226 338.066 30.987 318.618 0 304.77V0h500v304.77c-43.161-12.266-134.794-25.581-262.284 3.857z"
          fill="url(#prefix__paint1_linear_103:6)"
        />
        <Defs>
          <LinearGradient
            id="prefix__paint0_linear_103:6"
            x1={492.715}
            y1={231.205}
            x2={480.057}
            y2={364.215}
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset={0} stopColor="#0E1D35" />
            <Stop offset={0.25} stopColor="#02457A" />
            <Stop offset={0.5} stopColor="#018ABE" />
            <Stop offset={0.75} stopColor="#97CADB" />
            <Stop offset={1} stopColor="#D6EBEE" />
          </LinearGradient>
          <LinearGradient
            id="prefix__paint1_linear_103:6"
            x1={7.304}
            y1={4.155}
            x2={144.016}
            y2={422.041}
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset={0} stopColor="#0E1D35" />
            <Stop offset={0.25} stopColor="#02457A" />
            <Stop offset={0.5} stopColor="#018ABE" />
            <Stop offset={0.75} stopColor="#97CADB" />
            <Stop offset={1} stopColor="#D6EBEE" />
          </LinearGradient>
        </Defs>

      </Svg>
      <Image 
        source={require('../assets/Logo_WordWonder.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  )
}

export default function RecuperarContra({ auth, navigation }) {
  const [email, setEmail] = useState('');

  const handlePasswordRecovery = async () => {
    if (!email) {
      alert('El correo no puede estar vacío');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Se ha enviado un correo electrónico para restablecer tu contraseña. Por favor, revisa tu bandeja de entrada.');
    } catch (error) {
      console.error('Error al enviar el correo electrónico de recuperación de contraseña:', error.message);
    }
  };
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

  if(!fontsLoaded){
    return null
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.containerSVG}>
        <SvgTop/>
      </View>
      <View style={styles.container}>
        <Text style={styles.titulo}>Bienvenido</Text>
        <Text style={styles.subTitle}>{'Ingresa correo electronico'}</Text>
        <Text style={styles.subTitle2}>{'para recuperar contraseña'}</Text>
        <TextInput 
          placeholder="Correo electronico"
          style={styles.textInput}
          value={email}
        onChangeText={setEmail} 
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.forgotPassword}>
            ¿Ya tienes tu contraseña?
          </Text>
      </TouchableOpacity>
        <ButtonGradient onPress={handlePasswordRecovery} text={'Enviar codigo'}/>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#f1f1f1',
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  containerSVG: {
    width: width,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    position: 'absolute',
    width: 450,
    height: 450,
    bottom: -200,
    zIndex: 1,
  },
  titulo: {
    fontSize: 30,
    fontFamily: 'Gatha-SemiBold',
    color: 'transparent',
    marginTop: 30,
  },
  subTitle: {
    fontSize: 20,
    fontFamily: 'Questrial',
    marginTop: '20',
    color: 'gray',
  },
  subTitle2: {
    fontSize: 20,
    fontFamily: 'Questrial',
    marginBottom: 50,
    color: 'gray',
  },
  textInput: {
    padding: 5,
    paddingStart: 30,
    fontFamily: 'Questrial',
    width: '80%',
    height: 50,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  forgotPassword: {
    fontSize: 16,
    fontFamily: 'Questrial',
    color: 'gray',
    marginTop: 30,
    marginBottom: 30,
  },
  button: {

  },
});

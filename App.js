import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View, TextInput, Dimensions, Image, TouchableOpacity } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, initializeAuth, getReactNativePersistence } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonGradient from './components/ButtonGradient';
import PasswordInput from './components/PasswordInput';
import Navigation from './components/Navigation';
import EditarPerfil from './components/EditarPerfil'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const { width, height } = Dimensions.get('window')

const firebaseConfig = {
  apiKey: "AIzaSyDyWEzbzfHPmYn3tGZZnu0ZFlN2EoWW4n4",
  authDomain: "applogin-a38e9.firebaseapp.com",
  projectId: "applogin-a38e9",
  storageBucket: "applogin-a38e9.appspot.com",
  messagingSenderId: "474197038223",
  appId: "1:474197038223:web:91bdab7928736087484cfa"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

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
            <Stop stopColor="#124699" />
            <Stop offset={1} stopColor="#554ADD" />
          </LinearGradient>
          <LinearGradient
            id="prefix__paint1_linear_103:6"
            x1={7.304}
            y1={4.155}
            x2={144.016}
            y2={422.041}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#124699" />
            <Stop offset={1} stopColor="#554ADD" />
          </LinearGradient>
        </Defs>
      </Svg>
      <Image 
        source={require('./assets/adactative_icon_ww.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  )
}


export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  
    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    // Validaciones
    if (!email || !password) {
      alert('Los campos de usuario y contraseña no pueden estar vacíos');
      return;
    }

    if (email.length < 8 || password.length < 8) {
      alert('El nombre de usuario y la contraseña deben tener al menos 8 caracteres');
      return;
    }

    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordValidation.test(password)) {
      alert('La contraseña debe tener al menos 8 caracteres, contener al menos un carácter especial, una letra mayúscula, una letra minúscula y un número');
      return;
    }

    const repeatedChar = /(.)\1{2,}/;
    if (repeatedChar.test(password)) {
      alert('Evita el uso excesivo de un mismo carácter repetido en la contraseña');
      return;
    }
    try {
      if (user) {
        console.log('El usuario cerró sesión exitosamente!');
        await signOut(auth);
      } else {
        if (isLogin) { // Si el usuario está iniciando sesión
          await signInWithEmailAndPassword(auth, email, password);
          console.log('El usuario inició sesión correctamente!');
        } else { // Si el usuario está registrándose
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('Usuario creado con éxito!');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  const [fontsLoaded] = useFonts({
    black: require('./assets/fonts/Inter-Black.ttf'),
    bold: require('./assets/fonts/Inter-Bold.ttf'),
    medium: require('./assets/fonts/Inter-Medium.ttf'),
    regular: require('./assets/fonts/Inter-Regular.ttf'),
    semiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async ()=>{
    if(fontsLoaded){
      await SplashScreen.hideAsync();
    }
  },[fontsLoaded]);

  if(!fontsLoaded){
    return null
  }

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Navigation} />
          <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  

  return (
    <View style={styles.mainContainer}>
      <View style={styles.containerSVG}>
        <SvgTop/>
      </View>
      <View style={styles.container}>
        <Text style={styles.titulo}>Bienvenido</Text>
        <Text style={styles.subTitle}>{isLogin ? 'Iniciar sesión en su cuenta' : 'Crear una nueva cuenta'}</Text>
        <TextInput 
          placeholder="Correo electronico"
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
        />
        <PasswordInput 
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
        <ButtonGradient onPress={handleAuthentication} text={isLogin ? 'Iniciar Sesión' : 'Registrarse'}/>
        <Text style={styles.forgotPassword} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? "¿No tienes una cuenta? Regístrate" : "¿Ya tienes una cuenta? Inicia sesión"}
        </Text>
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
  },
  containerSVG: {
    width: width,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    position: 'absolute', // Esto posiciona la imagen de logo encima del SVG
    width: 200, // Ajusta esto al tamaño que desees para tu logo
    height: 200, // Ajusta esto al tamaño que desees para tu logo
  },
  titulo: {
    marginTop: 40,
    fontSize: 50,
    color: '#34434D',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 40,
    color: 'gray',
  },
  textInput: {
    padding: 10,
    paddingStart: 30,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  forgotPassword: {
    fontSize: 14,
    color: 'gray',
    marginTop: 20
  },
  button: {

  },
});

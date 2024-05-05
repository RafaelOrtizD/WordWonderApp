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
import RecuperarContra from './components/RecuperarContra';
import CustomAlert from './components/CostumAlert';
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
        source={require('./assets/Logo_WordWonder.png')}
        style={styles.logo}
        resizeMode="contain"/>
    </View>
  )
}

function LoginScreen({ navigation, setUser, user }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  
    return () => unsubscribe();
  }, [auth]);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const closeAlert = () => {
    setAlertVisible(false);
  };

  const handleAuthentication = async () => {
    // Validaciones
    if (!email) {
      setAlertMessage('Falta ingresar correo electronico');
      setAlertVisible(true);
      return;
    }
  
    if (!password) {
      setAlertMessage('La contraseña no puede estar vacía');
      setAlertVisible(true);
      return;
    }
  
    if (email.length < 8) {
      setAlertMessage('El correo electronico debe tener al menos 8 caracteres');
      setAlertVisible(true);
      return;
    }

    if (password.length < 8) {
      setAlertMessage('La contraseña debe tener al menos 8 caracteres');
      setAlertVisible(true);
      return;
    }
  
    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordValidation.test(password)) {
      setAlertMessage('La contraseña debe contener al menos un carácter especial, una letra mayúscula, una letra minúscula y un número');
      setAlertVisible(true);
      return;
    }
  
    try {
      if (user) {
        console.log('El usuario cerró sesión exitosamente!');
        await signOut(auth).catch((error) => {
          setAlertMessage('Error al cerrar sesión');
          setAlertVisible(true);
        });
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password).catch((error) => {
            setAlertMessage('El correo electrónico o la contraseña son incorrectos');
            setAlertVisible(true);
          });
          console.log('El usuario inició sesión correctamente!');
        } else { 
          await createUserWithEmailAndPassword(auth, email, password).catch((error) => {
            setAlertMessage('Error al crear usuario. Verifica tus credenciales');
            setAlertVisible(true);
          });
          console.log('Usuario creado con éxito!');
        }
      }
    } catch (error) {
      setAlertMessage('Error de autenticación');
      setAlertVisible(true);
    }
  };

  const [fontsLoaded] = useFonts({
    black: require('./assets/fonts/Poppins/Poppins-Black.ttf'),
    bold: require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    medium: require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
    regular: require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    semiBold: require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Questrial': require('./assets/fonts/Questrial-Regular.ttf'),
    'Genova-Black': require('./assets/fonts/Genova/Genova-Black.otf'),
    'Genova-Medium': require('./assets/fonts/Genova/Genova-Medium.otf'),
    'Gatha-SemiBold': require('./assets/fonts/Gatha/ZTGatha-SemiBold.ttf'),
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
    <View style={styles.mainContainer}>
      <CustomAlert message={alertMessage} visible={alertVisible} onClose={closeAlert} />
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
        <Text style={styles.forgotPassword} onPress={() => navigation.navigate('RecuperarContra')}>
          ¿Olvidaste tu contraseña?
        </Text>
        <ButtonGradient onPress={handleAuthentication} text={isLogin ? 'Iniciar Sesión' : 'Registrarse'}/>
        <Text style={styles.forgotPassword} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? "¿No tienes una cuenta? Regístrate" : "¿Ya tienes una cuenta? Inicia sesión"}
        </Text>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  
    return () => unsubscribe();
  }, [auth]);

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Navigation} />
          <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
          <Stack.Screen name="RecuperarContra" component={RecuperarContra} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} setUser={setUser} />}
        </Stack.Screen>
        <Stack.Screen name="RecuperarContra">
          {props => <RecuperarContra {...props} auth={auth} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
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
    fontSize: 50,
    fontFamily: 'Gatha-SemiBold',
    color: '#34434D',
    marginTop: 30,
  },
  subTitle: {
    fontSize: 20,
    fontFamily: 'Questrial',
    marginBottom: 20,
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
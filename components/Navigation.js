import React from 'react';
import { View, Platform } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Animated from 'react-native-reanimated';

import Inicio from '../Navegation/Inicio';
import Favoritos from '../Navegation/Favoritos';
import Camara from '../Navegation/Escanear';
import Perfil from '../Navegation/Perfil';
import Ajustes from '../Navegation/Ajustes';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Inicio"
        component={Inicio}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View style={{ transform: [{ scale: focused ? 1.2 : 1 }] }}>
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={24}
                color={focused ? '#124699' : '#000000'}
              />
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={Favoritos}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View style={{ transform: [{ scale: focused ? 1.2 : 1 }] }}>
              <Ionicons
                name={focused ? 'heart' : 'heart-outline'}
                size={24}
                color={focused ? '#124699' : '#000000'}
              />
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen
        name="Camara"
        component={Camara}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.cameraIcon}>
              <FontAwesome5 name="camera" size={24} color="#ffffff" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View style={{ transform: [{ scale: focused ? 1.2 : 1 }] }}>
              <MaterialIcons
                name={focused ? 'person' : 'person-outline'}
                size={24}
                color={focused ? '#124699' : '#000000'}
              />
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen
        name="Ajustes"
        component={Ajustes}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View style={{ transform: [{ scale: focused ? 1.2 : 1 }] }}>
              <Ionicons
                name={focused ? 'settings' : 'settings-outline'}
                size={24}
                color={focused ? '#124699' : '#000000'}
              />
            </Animated.View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: '#ffffff',
  },
};

const styles = {
  cameraIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#124699',
    height: Platform.OS === 'ios' ? 50 : 60,
    width: Platform.OS === 'ios' ? 50 : 60,
    top: Platform.OS === 'ios' ? -10 : -20,
    borderRadius: Platform.OS === 'ios' ? 25 : 30,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
};

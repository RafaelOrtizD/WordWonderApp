import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Logo from '../assets/Logo_WordWonder.png';

export default function Inicio() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={Logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 500, 
    height: 500, 
    resizeMode: 'contain',
  },
});

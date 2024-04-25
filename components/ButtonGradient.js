import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';

export default function ButtonGradient({ onPress, text }) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'Questrial': require('../assets/fonts/Questrial-Regular.ttf'),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={['#2D388A','#00AEEF']}
        start={{x: 1, y: 0}}
        end={{x: 1, y: 1}}    
        style={styles.button}
      >
        <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 200,
    marginTop: 60,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'semibold',
    fontFamily: 'Questrial',
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

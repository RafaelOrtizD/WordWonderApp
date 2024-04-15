import React from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ButtonGradient({ onPress, text }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        // Button Linear Gradient
        colors={['#124699', '#554ADD']}
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
    fontSize: 14,
    color: '#fff',
    fontWeight: 'semibold',
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

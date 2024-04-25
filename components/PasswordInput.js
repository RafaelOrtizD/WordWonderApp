import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PasswordInput({ value, onChangeText }) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, paddingStart: 30, width: '80%', height: 50, marginTop: 20, borderRadius: 10, backgroundColor: '#fff' }}>
        <TextInput 
          placeholder="Contraseña"
          style={{ flex: 1 }}
          secureTextEntry={!isPasswordVisible}
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(prevState => !prevState)} style={{ marginRight: 10 }}>
          <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="rgba(0,0,0,0.5)" />
        </TouchableOpacity>
      </View>
    );
}
  

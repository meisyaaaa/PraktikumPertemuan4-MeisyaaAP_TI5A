import React, { useState } from 'react'; 
import { View, TextInput, StyleSheet } from 'react-native'; 
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens'; 

export default function SearchBar({ 
  placeholder = 'Cari entri...', 
  onChange, 
}) { 
  const [queryText, setQueryText] = useState(''); 

  const handleChange = (text) => { 
    setQueryText(text); 
    onChange?.(text); 
  }; 

  return ( 
    <View style={styles.wrap}>  
      <TextInput 
        value={queryText} 
        onChangeText={handleChange} 
        placeholder={placeholder} 
        placeholderTextColor={COLORS.muted || '#9ca3af'} 
        style={styles.input} 
        accessibilityLabel="Kolom pencarian" 
        clearButtonMode="while-editing" // Fitur bawaan untuk menghapus teks cepat di iOS
      /> 
    </View> 
  ); 
} 

const styles = StyleSheet.create({ 
  wrap: { 
    paddingHorizontal: SPACE.l, 
    paddingVertical: SPACE.m, 
  }, 
  input: { 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    borderRadius: RADIUS.card, 
    paddingHorizontal: SPACE.m, 
    paddingVertical: 10, 
    backgroundColor: '#fff', 
    fontSize: TYPO?.body || 14, 
    color: COLORS.text || '#000', 
  }, 
});
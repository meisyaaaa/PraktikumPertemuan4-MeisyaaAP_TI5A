import React, { useState } from 'react'; 
import { View, TextInput, StyleSheet, Pressable, Text, Image } from 'react-native'; 
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens'; 

// Opsi gambar mood dari assets lokal
const MOOD_OPTIONS = [
  { id: 'happy', label: 'Happy', source: require('../../assets/moods/happy.jpg') },
  { id: 'badmood', label: 'badmood', source: require('../../assets/moods/badmood.jpg') },
];

export default function EntryForm({ onSubmit }) { 
  const [title, setTitle] = useState(''); 
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); 
  const [preview, setPreview] = useState(''); 
  const [selectedMood, setSelectedMood] = useState(MOOD_OPTIONS[0]);

  const canSubmit = 
    title.trim().length > 0 && 
    preview.trim().length > 0; 

  const submit = () => { 
    if (!canSubmit) return; 

    onSubmit?.({ 
      id: Date.now(), 
      title: title.trim(), 
      date: date.trim(), 
      preview: preview.trim(), 
      body: preview.trim(), 
      moodImage: selectedMood.source, 
    }); 

    // Reset Form
    setTitle(''); 
    setDate(new Date().toISOString().split('T')[0]); 
    setPreview(''); 
    setSelectedMood(MOOD_OPTIONS[0]);
  }; 

  return ( 
    <View style={styles.form}> 
      <Text style={styles.heading}>Tambah Entri</Text> 

      <TextInput 
        value={title} 
        onChangeText={setTitle} 
        placeholder="Judul" 
        style={styles.input} 
      /> 

      <TextInput 
        value={date} 
        onChangeText={setDate} 
        placeholder="YYYY-MM-DD" 
        style={styles.input} 
      /> 

      <TextInput 
        value={preview} 
        onChangeText={setPreview} 
        placeholder="Ringkasan..." 
        style={[styles.input, styles.multiline]} 
        multiline 
      /> 

      {/* Mood Selector */}
      <Text style={styles.label}>Pilih Mood:</Text>
      <View style={styles.moodContainer}>
        {MOOD_OPTIONS.map((mood) => (
          <Pressable
            key={mood.id}
            onPress={() => setSelectedMood(mood)}
            style={[
              styles.moodOption,
              selectedMood.id === mood.id && styles.moodOptionSelected,
            ]}
          >
            <Image source={mood.source} style={styles.moodIcon} />
            <Text style={styles.moodText}>{mood.label}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable 
        onPress={submit} 
        disabled={!canSubmit} 
        style={[styles.button, !canSubmit && styles.buttonDisabled]} 
      > 
        <Text style={styles.buttonText}>Simpan</Text> 
      </Pressable> 
    </View> 
  ); 
} 

const styles = StyleSheet.create({ 
  form: { padding: SPACE.l, gap: SPACE.s }, 
  heading: { 
    fontSize: TYPO.title, 
    fontWeight: '700', 
    color: COLORS.text, 
    marginBottom: SPACE.s, 
  }, 
  input: { 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    borderRadius: RADIUS.card, 
    paddingHorizontal: SPACE.m, 
    paddingVertical: 10, 
    backgroundColor: '#fff', 
  }, 
  multiline: { 
    minHeight: 80, 
    textAlignVertical: 'top', 
  }, 
  label: {
    fontSize: TYPO.caption,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 4,
  },
  moodContainer: {
    flexDirection: 'row',
    gap: SPACE.s,
  },
  moodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: '#fff',
  },
  moodOptionSelected: {
    borderColor: COLORS.accent || '#4f46e5',
    backgroundColor: '#eef2ff',
  },
  moodIcon: {
    width: 24,
    height: 24,
  },
  moodText: {
    fontSize: TYPO.caption,
    color: COLORS.text,
  },
  button: { 
    marginTop: SPACE.s, 
    padding: SPACE.m, 
    borderRadius: RADIUS.card, 
    backgroundColor: COLORS.accent || '#4f46e5', 
    alignItems: 'center', 
  }, 
  buttonDisabled: { opacity: 0.5 }, 
  buttonText: { color: '#fff', fontWeight: '700' }, 
});
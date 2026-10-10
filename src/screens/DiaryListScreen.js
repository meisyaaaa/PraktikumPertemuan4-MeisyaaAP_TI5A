import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import DiaryCard from '../components/DiaryCard';

import BosenImage from '../../assets/moods/Bosen.jpg';
import happyImage from '../../assets/moods/happy.jpg';
import malam1Image from '../../assets/moods/malam1.jpg';
import avatar1 from '../../assets/moods/avatar1.jpg';
import pagi2Image from '../../assets/moods/pagi2.jpg';
import nyantaiImage from '../../assets/moods/nyantai.jpg';

const diaryEntries = [
  {
    id: 1,
    title: 'malam yang hening',
    date: '2026-09-06',
    preview: 'Hari ini aku pulang ngampus tengah malam...',
    moodImage: malam1Image, 
    moodType: 'tired',
  },
  {
    id: 2,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview: 'Hari ini aku bangun pagi dan berjalan kaki. Udara terasa sejuk...',
    moodImage: pagi2Image, 
    moodType: 'calm',
  },
  {
    id: 3,
    title: 'Hari Yang Sangat Happy',
    date: '2025-01-19',
    preview: 'Aku Hari Ini Main Sama MY BOYFRIEND, seharian fulll...',
    moodImage: happyImage, 
    moodType: 'cheerful',
  },
  {
    id: 4,
    title: 'Hari yang bosen',
    date: '2025-10-03',
    preview: 'Aku Hari Ini Bosen Baget Gatau Mau Ngapain...',
    moodImage: BosenImage,
    moodType: 'bored',
  },
  {
    id: 5,
    title: 'Akhir Pekan Santai',
    date: '2025-10-02',
    preview: 'Menghabiskan waktu dikamar dan menonton film...',
    moodImage: nyantaiImage,
    moodType: 'bored',
  },
];

export default function DiaryListScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Section Header dengan Avatar */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.welcomeText}>WELCOME,</Text>
          <Text style={styles.headerTitle}>Buku Harian Zaskia</Text>
        </View>
        <Image
          source={avatar1} // 
          style={styles.avatar}
        />
      </View>

      {/* Daftar Kartu Diary */}
      {diaryEntries.map((entry) => (
        <DiaryCard
          key={entry.id}
          title={entry.title}
          date={entry.date}
          preview={entry.preview}
          moodImage={entry.moodImage}
          moodType={entry.moodType}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  welcomeText: {
    fontSize: 14,
    color: '#7894cc',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#e378d3',
  },
});
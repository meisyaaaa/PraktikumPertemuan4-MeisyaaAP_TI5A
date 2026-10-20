import React, { useMemo, useState } from 'react'; 
import { View, Text, StyleSheet, FlatList } from 'react-native'; 

import { COLORS, SPACE, TYPO } from '../styles/tokens'; 
import DiaryCard from '../components/DiaryCard'; 
import DiaryDetailModal from '../components/DiaryDetailModal'; 
import SearchBar from '../components/SearchBar'; 
import EntryForm from '../components/EntryForm'; 

const INITIAL_ENTRIES = [ 
  { 
    id: 1, 
    title: 'Pagi Yang Sibuk', 
    date: '2026-10-20', 
    preview: 'Di hari selasa pagi ini aku bener-bener sibuk banget.', 
    body: 'Hari ini aku bangun lebih pagi untuk chek-up medis dan masuk poli jiwa untuk cek kesehatan mental.', 
    moodImage: require('../../assets/moods/paprs.jpg'), // Pastikan file ini ada
  }, 
  { 
    id: 2, 
    title: 'Siang di Kampus', 
    date: '2026-10-20', 
    preview: 'Datang ke kampus buat beli makan dan ngampus.', 
    body: 'Setelah cek medis, aku langsung ke kampus dan ngerjain modul praktikum sama temen-temen.', 
    moodImage: require('../../assets/moods/kampus.jpg'), 
  }, 
  { 
    id: 3, 
    title: 'Sore masih sibuk di kampus', 
    date: '2026-10-20', 
    preview: 'Rapat Saintek Hearing.', 
    body: 'Sore itu aku langsung kumpul BEM untuk prokeran Saintek Hearing atau rapat bersama ormawa HMIF.', 
    moodImage: require('../../assets/moods/rapat.jpg'), 
  }, 
   { 
    id: 4, 
    title: 'Malam masih sibuk', 
    date: '2026-10-20', 
    preview: 'Nugas malam.', 
    body: 'Malam ini aku masih perlu mengerjakan tugas-tugas baru yang diberikan dosen yang belum selesai di kerjakan.', 
    moodImage: require('../../assets/moods/ngoding.jpg'), 
  }, 
   { 
    id: 5, 
    title: 'Rencana Pulang Kampung Hari Jumat', 
    date: '2026-10-23', 
    preview: 'Pulang ke rumah untuk istirahat.', 
    body: 'Jumat nanti aku ada rencana pulang ke rumah untuk istirahat dan acara keliuarga lainnya.', 
    moodImage: require('../../assets/moods/pulkam.jpg'), 
  }, 
]; 

export default function DiaryListScreen() { 
  // STATE UTAMA 
  const [entries, setEntries] = useState(INITIAL_ENTRIES); 
  const [query, setQuery] = useState(''); 
  const [likedIds, setLikedIds] = useState(new Set()); 
  const [selected, setSelected] = useState(null); 

  // DERIVED STATE 
  const filtered = useMemo(() => { 
    if (!query.trim()) return entries; 

    const q = query.toLowerCase(); 

    return entries.filter((entry) => 
      entry.title.toLowerCase().includes(q) || 
      entry.preview.toLowerCase().includes(q) || 
      entry.date.toLowerCase().includes(q) 
    ); 
  }, [entries, query]); 

  const toggleLike = (id) => { 
    setLikedIds((prev) => { 
      const next = new Set(prev); 

      if (next.has(id)) { 
        next.delete(id); 
      } else { 
        next.add(id); 
      } 

      return next; 
    }); 
  }; 

  const addEntry = (newEntry) => { 
    setEntries((prev) => [newEntry, ...prev]); 
  }; 

  const renderItem = ({ item }) => ( 
    <View style={styles.cardWrapper}>
      <DiaryCard 
        title={item.title} 
        date={item.date} 
        preview={item.preview} 
        moodImage={item.moodImage} 
        liked={likedIds.has(item.id)} 
        onToggleLike={() => toggleLike(item.id)} 
        onPress={() => setSelected(item)} 
      /> 
    </View>
  ); 

  return ( 
    <View style={styles.container}> 
      <FlatList 
        data={filtered} 
        keyExtractor={(item) => String(item.id)} 
        renderItem={renderItem} 
        contentContainerStyle={styles.listContent} 
        ListHeaderComponent={
          <>
            <Text style={styles.header}>Buku Harian</Text> 
            <EntryForm onSubmit={addEntry} /> 
            <SearchBar onChange={setQuery} /> 
          </>
        }
        ListEmptyComponent={ 
          <Text style={styles.empty}>Belum ada entri.</Text> 
        } 
      /> 

      <DiaryDetailModal 
        visible={!!selected} 
        entry={selected} 
        onClose={() => setSelected(null)} 
      /> 
    </View> 
  ); 
} 

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: COLORS.surface, 
  }, 
  header: { 
    fontSize: TYPO.h1, 
    fontWeight: '700', 
    paddingHorizontal: SPACE.l, 
    paddingTop: SPACE.l, 
    color: COLORS.text, 
  }, 
  listContent: { 
    paddingBottom: SPACE.l, 
  }, 
  cardWrapper: {
    paddingHorizontal: SPACE.l,
    marginBottom: SPACE.m,
  },
  empty: { 
    textAlign: 'center', 
    color: COLORS.muted, 
    marginTop: 40, 
  }, 
});
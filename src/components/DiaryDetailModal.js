import React from 'react';
import { Modal, View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

export default function DiaryDetailModal({ visible, onClose, entry }) {
  if (!entry) return null;

  const { title, date, body, heroUri, moodImage } = entry;

  // Menentukan sumber gambar (apakah berbentuk URI online/string atau require lokal)
  const imageSource = heroUri
    ? typeof heroUri === 'string'
      ? { uri: heroUri }
      : heroUri
    : moodImage;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {imageSource && (
            <Image
              source={imageSource}
              style={styles.hero}
              resizeMode="cover"
            />
          )}

          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.body}>{body}</Text>

            <Pressable onPress={onClose} style={styles.button}>
              <Text style={styles.buttonText}>Tutup</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  scrollContent: {
    flexGrow: 1,
  },
  hero: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#eef2ff',
    borderBottomLeftRadius: RADIUS.card,
    borderBottomRightRadius: RADIUS.card,
  },
  content: {
    padding: SPACE.l,
    gap: SPACE.s,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginBottom: SPACE.s,
  },
  body: {
    fontSize: TYPO.body,
    color: COLORS.text,
    lineHeight: 22,
  },
  button: {
    marginTop: SPACE.l,
    padding: SPACE.m,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent || COLORS.primary || '#4f46e5',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
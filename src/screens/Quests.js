import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import theme from '../styles/theme';

const dummyQuests = [
  { id: '1', title: 'Morning Run', xp: 100, status: 'active' },
  { id: '2', title: '50 Push-ups', xp: 150, status: 'completed' },
  { id: '3', title: 'Yoga Session', xp: 80, status: 'active' },
];

const QuestItem = ({ item }) => (
  <TouchableOpacity 
    style={[
      styles.questCard,
      item.status === 'completed' && styles.completedQuest
    ]}
  >
    <View style={styles.questInfo}>
      <Text style={styles.questTitle}>{item.title}</Text>
      <Text style={styles.questXP}>{item.xp} XP</Text>
    </View>
    <Text style={[
      styles.questStatus,
      item.status === 'completed' && styles.completedStatus
    ]}>
      {item.status.toUpperCase()}
    </Text>
  </TouchableOpacity>
);

export default function Quests() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={dummyQuests}
          renderItem={({ item }) => <QuestItem item={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  list: {
    flexGrow: 1,
  },
  questCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedQuest: {
    opacity: 0.7,
  },
  questInfo: {
    flex: 1,
  },
  questTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontFamily: theme.fonts.heading,
    marginBottom: 4,
  },
  questXP: {
    color: theme.colors.accent,
    fontSize: 14,
    fontFamily: theme.fonts.body,
  },
  questStatus: {
    color: theme.colors.primary,
    fontSize: 12,
    fontFamily: theme.fonts.body,
  },
  completedStatus: {
    color: theme.colors.success,
  },
}); 
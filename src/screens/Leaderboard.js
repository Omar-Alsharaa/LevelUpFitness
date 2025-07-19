import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import theme from '../styles/theme';

const dummyLeaderboard = [
  { id: '1', name: 'Shadow Monarch', xp: 12500, rank: 'S' },
  { id: '2', name: 'Beast King', xp: 10200, rank: 'A' },
  { id: '3', name: 'Iron Body', xp: 8800, rank: 'B' },
  { id: '4', name: 'Swift Runner', xp: 7500, rank: 'C' },
  { id: '5', name: 'New Hunter', xp: 5000, rank: 'D' },
];

export default function Leaderboard({ navigation }) {
  const getRankColor = (rank) => {
    switch (rank) {
      case 'S': return theme.colors.danger;
      case 'A': return theme.colors.warning;
      case 'B': return theme.colors.secondary;
      case 'C': return theme.colors.primary;
      default: return theme.colors.textSecondary;
    }
  };

  const renderLeaderboardItem = ({ item, index }) => (
    <View style={styles.leaderboardItem}>
      <Text style={styles.position}>#{index + 1}</Text>
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{item.name}</Text>
        <Text style={styles.playerXP}>{item.xp.toLocaleString()} XP</Text>
      </View>
      <View style={[styles.rankBadge, { backgroundColor: getRankColor(item.rank) }]}>
        <Text style={styles.rankText}>{item.rank}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyLeaderboard}
        renderItem={renderLeaderboardItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.leaderboardList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  leaderboardList: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  leaderboardItem: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  position: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.lg,
    fontFamily: theme.fonts.heading,
    width: 40,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.md,
    fontFamily: theme.fonts.heading,
    marginBottom: theme.spacing.xs,
  },
  playerXP: {
    color: theme.colors.accent,
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fonts.body,
  },
  rankBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fonts.heading,
  },
}); 
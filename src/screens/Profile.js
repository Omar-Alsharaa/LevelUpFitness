import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import theme from '../styles/theme';

const dummyProfile = {
  name: 'Shadow Monarch',
  level: 42,
  xp: 12500,
  nextLevelXP: 15000,
  stats: {
    strength: 85,
    agility: 72,
    endurance: 90,
  },
  achievements: [
    { id: '1', title: 'First Quest', description: 'Complete your first quest' },
    { id: '2', title: 'Boss Slayer', description: 'Defeat your first boss' },
    { id: '3', title: 'Fitness Warrior', description: 'Complete 10 quests' },
  ],
};

export default function Profile({ navigation }) {
  const renderStat = (label, value) => (
    <View style={styles.statContainer}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statBarContainer}>
        <View style={[styles.statBar, { width: `${value}%` }]} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{dummyProfile.name}</Text>
        <Text style={styles.level}>Level {dummyProfile.level}</Text>
      </View>

      <View style={styles.xpContainer}>
        <Text style={styles.xpText}>
          XP: {dummyProfile.xp} / {dummyProfile.nextLevelXP}
        </Text>
        <View style={styles.xpBarContainer}>
          <View 
            style={[
              styles.xpBar,
              { width: `${(dummyProfile.xp / dummyProfile.nextLevelXP) * 100}%` }
            ]} 
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stats</Text>
        {renderStat('Strength', dummyProfile.stats.strength)}
        {renderStat('Agility', dummyProfile.stats.agility)}
        {renderStat('Endurance', dummyProfile.stats.endurance)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        {dummyProfile.achievements.map(achievement => (
          <View key={achievement.id} style={styles.achievement}>
            <Text style={styles.achievementTitle}>{achievement.title}</Text>
            <Text style={styles.achievementDescription}>
              {achievement.description}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  name: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.xxl,
    fontFamily: theme.fonts.heading,
    marginBottom: theme.spacing.xs,
  },
  level: {
    color: theme.colors.accent,
    fontSize: theme.fontSizes.lg,
    fontFamily: theme.fonts.body,
  },
  xpContainer: {
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  xpText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.md,
    fontFamily: theme.fonts.body,
    textAlign: 'center',
  },
  xpBarContainer: {
    height: 10,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.sm,
    overflow: 'hidden',
  },
  xpBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  section: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.xl,
    fontFamily: theme.fonts.heading,
    marginBottom: theme.spacing.sm,
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  statLabel: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.md,
    fontFamily: theme.fonts.body,
    width: 100,
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.sm,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
    backgroundColor: theme.colors.accent,
  },
  statValue: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.md,
    fontFamily: theme.fonts.body,
    width: 40,
    textAlign: 'right',
  },
  achievement: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.xs,
  },
  achievementTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.md,
    fontFamily: theme.fonts.heading,
  },
  achievementDescription: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fonts.body,
  },
  logoutButton: {
    margin: theme.spacing.lg,
    backgroundColor: theme.colors.danger,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.md,
    fontFamily: theme.fonts.heading,
  },
}); 
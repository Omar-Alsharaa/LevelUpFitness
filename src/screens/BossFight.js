import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { theme } from '../styles/theme';

export default function BossFight({ navigation }) {
  const [bossHealth, setBossHealth] = useState(100);
  const [playerHealth, setPlayerHealth] = useState(100);

  const attack = () => {
    const damage = Math.floor(Math.random() * 20) + 10;
    setBossHealth(Math.max(0, bossHealth - damage));
    
    // Boss counter-attack
    setTimeout(() => {
      const bossDamage = Math.floor(Math.random() * 15) + 5;
      setPlayerHealth(Math.max(0, playerHealth - bossDamage));
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <View style={styles.healthBar}>
          <Text style={styles.healthText}>Boss Health: {bossHealth}%</Text>
          <View style={styles.healthBarBackground}>
            <View style={[styles.healthBarFill, { width: `${bossHealth}%` }]} />
          </View>
        </View>
        
        <View style={styles.healthBar}>
          <Text style={styles.healthText}>Your Health: {playerHealth}%</Text>
          <View style={styles.healthBarBackground}>
            <View style={[styles.healthBarFill, { width: `${playerHealth}%`, backgroundColor: theme.colors.success }]} />
          </View>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.button} onPress={attack}>
          <Text style={styles.buttonText}>Attack!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  statsContainer: {
    gap: theme.spacing.xl,
  },
  healthBar: {
    gap: theme.spacing.sm,
  },
  healthText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.md,
    fontFamily: theme.fonts.heading,
  },
  healthBarBackground: {
    height: 20,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.sm,
    overflow: 'hidden',
  },
  healthBarFill: {
    height: '100%',
    backgroundColor: theme.colors.danger,
  },
  actionsContainer: {
    gap: theme.spacing.md,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.lg,
    fontFamily: theme.fonts.heading,
  },
}); 
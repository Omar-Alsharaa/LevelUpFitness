import React, { useEffect } from 'react';
import { Animated, Easing, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../styles/theme';

// Animated wrapper for glowing effects
export const GlowContainer = styled(Pressable)`
  ${({ theme }) => theme.shadows.glow};
`;

// Animated level bar
export const LevelBarContainer = styled.View`
  width: 100%;
  height: ${8}px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  overflow: hidden;
  margin-vertical: ${({ theme }) => theme.spacing.sm}px;
`;

export const LevelBarFill = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.colors.gradientPrimary,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
}))`
  height: 100%;
  width: ${({ progress }) => progress}%;
`;

// Animated text that glows
export const GlowingText = ({ children, color, style, ...props }) => {
  const glowAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.sine),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.sine),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.Text
      style={[
        style,
        {
          color: color,
          textShadowColor: color,
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 10,
          opacity: glowAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.7, 1],
          }),
        },
      ]}
      {...props}
    >
      {children}
    </Animated.Text>
  );
};

// Animated boss aura effect
export const BossAura = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  ${({ theme }) => theme.effects.bossAura};
`;

// Animated level up effect
export const LevelUpEffect = ({ onComplete }) => {
  const scaleAnim = new Animated.Value(0);
  const opacityAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(onComplete);
    });
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: opacityAnim,
      }}
    >
      <Animated.View
        style={{
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: 'rgba(255, 215, 0, 0.3)',
          transform: [{ scale: scaleAnim }],
          ...theme.effects.levelUp,
        }}
      />
    </Animated.View>
  );
};

// Animated quest completion effect
export const QuestCompleteEffect = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(54, 226, 180, 0.2);
  ${({ theme }) => theme.effects.systemGlow};
`;

// Animated button press effect
export const PressableScale = ({ children, onPress, scale = 0.95 }) => {
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: scale,
      useNativeDriver: true,
      ...theme.animations.spring,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      ...theme.animations.spring,
    }).start();
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
      }}
    >
      <GlowContainer
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        {children}
      </GlowContainer>
    </Animated.View>
  );
}; 
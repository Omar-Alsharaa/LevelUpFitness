import React from 'react';
import { ScrollView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../styles/theme';
import {
  Card,
  Title,
  SubTitle,
  StatContainer,
  StatLabel,
  StatValue,
  GradientButton,
} from '../components/StyledComponents';
import {
  GlowingText,
  LevelBarContainer,
  LevelBarFill,
  PressableScale,
} from '../components/AnimatedComponents';
import styled from 'styled-components/native';

// Styled components specific to Dashboard
const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md};
`;

const Header = styled.View`
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const MenuGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const MenuItem = styled(Card)`
  width: 48%;
  aspect-ratio: 1;
  margin: ${({ theme }) => theme.spacing.xs} 0;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.card};
`;

const IconContainer = styled(GradientButton)`
  width: 60;
  height: 60;
  border-radius: 30;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const MenuText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.body};
  margin-top: ${({ theme }) => theme.spacing.xs};
  text-align: center;
`;

const StatsGrid = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  ${({ theme }) => theme.shadows.md};
`;

const LevelText = styled(GlowingText)`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-family: ${({ theme }) => theme.fonts.heading};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export default function Dashboard({ navigation }) {
  const menuItems = [
    {
      title: 'Daily Quests',
      icon: 'list',
      screen: 'Quests',
      color: theme.colors.primary,
      gradient: theme.colors.gradientPrimary,
    },
    {
      title: 'Boss Fight',
      icon: 'skull',
      screen: 'BossFight',
      color: theme.colors.danger,
      gradient: theme.colors.gradientDanger,
    },
    {
      title: 'Leaderboard',
      icon: 'trophy',
      screen: 'Leaderboard',
      color: theme.colors.warning,
      gradient: theme.colors.gradientMonarch,
    },
    {
      title: 'Profile',
      icon: 'person',
      screen: 'Profile',
      color: theme.colors.secondary,
      gradient: theme.colors.gradientSuccess,
    },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Container>
        <Header>
          <Title style={{ fontFamily: theme.fonts.heading }}>SoloFitness</Title>
          <SubTitle style={{ fontFamily: theme.fonts.body }}>
            Level Up Your Fitness Journey
          </SubTitle>
          <View style={{ alignItems: 'center', marginTop: theme.spacing.md }}>
            <LevelText color={theme.colors.levelUp}>Level 42</LevelText>
            <LevelBarContainer>
              <LevelBarFill progress={75} />
            </LevelBarContainer>
          </View>
        </Header>

        <MenuGrid>
          {menuItems.map((item, index) => (
            <PressableScale
              key={index}
              onPress={() => navigation.navigate(item.screen)}
            >
              <MenuItem>
                <IconContainer colors={item.gradient}>
                  <Ionicons name={item.icon} size={32} color={theme.colors.text} />
                </IconContainer>
                <MenuText>{item.title}</MenuText>
              </MenuItem>
            </PressableScale>
          ))}
        </MenuGrid>

        <StatsGrid>
          <StatContainer>
            <StatValue style={{ fontFamily: theme.fonts.heading }}>12</StatValue>
            <StatLabel style={{ fontFamily: theme.fonts.body }}>Quests</StatLabel>
          </StatContainer>
          <StatContainer>
            <StatValue style={{ fontFamily: theme.fonts.heading }}>3</StatValue>
            <StatLabel style={{ fontFamily: theme.fonts.body }}>Bosses</StatLabel>
          </StatContainer>
          <StatContainer>
            <StatValue style={{ fontFamily: theme.fonts.heading }}>42</StatValue>
            <StatLabel style={{ fontFamily: theme.fonts.body }}>Level</StatLabel>
          </StatContainer>
        </StatsGrid>
      </Container>
    </ScrollView>
  );
} 
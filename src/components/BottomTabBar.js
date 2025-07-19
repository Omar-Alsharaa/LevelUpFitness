import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const TabBarContainer = styled.View`
  flex-direction: row;
  height: 60px;
  background-color: ${props => props.theme.colors.background.darker};
  border-top-width: 1px;
  border-top-color: rgba(67, 97, 238, 0.3);
`;

const TabButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TabLabel = styled.Text`
  color: ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.text.secondary};
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.theme.fontSizes.xs}px;
  margin-top: 4px;
`;

const TabIndicator = styled.View`
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 30px;
  background-color: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.full}px;
`;

const tabs = [
  { name: 'Dashboard', icon: 'home-outline', activeIcon: 'home' },
  { name: 'Quests', icon: 'list-outline', activeIcon: 'list' },
  { name: 'BossFight', icon: 'fitness-outline', activeIcon: 'fitness' },
  { name: 'Leaderboard', icon: 'trophy-outline', activeIcon: 'trophy' },
  { name: 'Profile', icon: 'person-outline', activeIcon: 'person' },
];

export default function BottomTabBar() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <TabBarContainer>
      {tabs.map((tab) => {
        const isActive = route.name === tab.name;
        
        return (
          <TabButton
            key={tab.name}
            onPress={() => navigation.navigate(tab.name)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isActive ? tab.activeIcon : tab.icon}
              size={24}
              color={isActive ? theme.colors.primary : theme.colors.text.secondary}
            />
            <TabLabel isActive={isActive}>{tab.name}</TabLabel>
            {isActive && <TabIndicator />}
          </TabButton>
        );
      })}
    </TabBarContainer>
  );
} 
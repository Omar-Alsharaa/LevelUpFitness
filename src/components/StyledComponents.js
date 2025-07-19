import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

// Card component with magical glow effect
export const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  margin: ${({ theme }) => theme.spacing.sm}px;
  ${({ theme }) => theme.shadows.md};
`;

// Magical button with gradient
export const GradientButton = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.colors.gradientPrimary,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
}))`
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.shadows.glow};
`;

// Text styles
export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.xxl}px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

export const SubTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.lg}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  font-family: ${({ theme }) => theme.fonts.body};
`;

// Stats display
export const StatContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.spacing.xs}px;
`;

export const StatLabel = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  width: ${100}px;
  font-family: ${({ theme }) => theme.fonts.body};
`;

export const StatValue = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

// Progress bar with magical effect
export const ProgressBarContainer = styled.View`
  height: ${8}px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  overflow: hidden;
  margin-vertical: ${({ theme }) => theme.spacing.sm}px;
`;

export const ProgressBarFill = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.colors.gradientPrimary,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
}))`
  height: 100%;
  width: ${({ progress }) => progress}%;
`;

// Quest/Achievement card
export const QuestCard = styled(Card)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  border-left-width: ${4}px;
  border-left-color: ${({ theme, status }) => 
    status === 'completed' ? theme.colors.success :
    status === 'in-progress' ? theme.colors.warning :
    theme.colors.monarch};
`;

// Boss fight components
export const BossContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing.xl}px;
  margin: ${({ theme }) => theme.spacing.lg}px;
  ${({ theme }) => theme.effects.bossAura};
`;

// Level display with magical effect
export const LevelDisplay = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm}px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${999}px;
  ${({ theme }) => theme.shadows.glow};
`;

export const LevelText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.xl}px;
  color: ${({ theme }) => theme.colors.levelUp};
  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

// Navigation menu item
export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme, active }) => 
    active ? theme.colors.cardHover : 'transparent'};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
`;

export const MenuText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  color: ${({ theme, active }) => 
    active ? theme.colors.accent : theme.colors.textSecondary};
  margin-left: ${({ theme }) => theme.spacing.sm}px;
  font-family: ${({ theme }) => theme.fonts.body};
`;

// Achievement badge
export const Badge = styled.View`
  background-color: ${({ theme, type }) => theme.colors[type || 'primary']};
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${999}px;
  align-self: flex-start;
`;

export const BadgeText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xs}px;
  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.mono};
`; 
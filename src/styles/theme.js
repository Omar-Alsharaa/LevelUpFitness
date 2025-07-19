import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

// Solo Leveling inspired theme with dark backgrounds and magical accent colors
const theme = {
  colors: {
    // Main colors
    background: '#0A0A12', // Darker background for more contrast
    primary: '#2FE7F0', // Electric blue like system messages
    secondary: '#7F00FF', // Deep purple like monarch's power
    accent: '#FF6E6E', // Red for danger/boss fights
    
    // Text colors
    text: '#FFFFFF',
    textSecondary: '#B4B4C7',
    textMuted: '#6E6E8F',
    
    // Status colors
    success: '#36E2B4', // Healing green
    warning: '#FFB800', // System warning yellow
    danger: '#FF2D55', // Boss fight red
    info: '#4361EE', // Quest info blue
    
    // UI Elements
    card: '#13131A',
    cardHover: '#1A1A23',
    border: '#2A2A35',
    
    // Special effects
    monarch: '#7F00FF', // Shadow Monarch's power
    levelUp: '#FFD700', // Level up gold
    bossAura: '#FF0844', // Boss fight aura
    systemBlue: '#2FE7F0', // System message blue
    
    // Gradients
    gradientPrimary: ['#2FE7F0', '#4361EE'],
    gradientMonarch: ['#7F00FF', '#4A00E0'],
    gradientDanger: ['#FF0844', '#FF2D55'],
    gradientSuccess: ['#36E2B4', '#2FE7F0'],
  },
  
  fonts: {
    heading: 'Orbitron_700Bold',
    body: 'Rajdhani_500Medium',
    mono: 'Rajdhani_600SemiBold',
  },
  
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
    xxxl: 48,
    display: 64,
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    full: 999,
  },
  
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  },
  
  animations: {
    fast: 200,
    normal: 300,
    slow: 500,
    spring: {
      damping: 15,
      mass: 1,
      stiffness: 200,
    },
  },
  
  // Special effects for Solo Leveling style
  effects: {
    monarchAura: {
      shadowColor: '#7F00FF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 30,
      elevation: 10,
    },
    bossAura: {
      shadowColor: '#FF0844',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 30,
      elevation: 10,
    },
    levelUp: {
      shadowColor: '#FFD700',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 30,
      elevation: 10,
    },
    systemGlow: {
      shadowColor: '#2FE7F0',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 30,
      elevation: 10,
    }
  },
  
  // Layout
  layout: {
    screenWidth: width,
    screenHeight: height,
    maxWidth: 1200,
    headerHeight: 60,
    footerHeight: 50,
    spacing: {
      page: 16,
      card: 16,
      input: 12,
    },
  },
  
  // Z-index
  zIndex: {
    modal: 1000,
    overlay: 900,
    dropdown: 800,
    header: 700,
    footer: 600,
  },
};

export default theme;
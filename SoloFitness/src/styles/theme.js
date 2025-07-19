// Solo Leveling inspired theme with dark backgrounds and neon accent colors
export const theme = {
  colors: {
    // Primary colors
    primary: '#4361EE', // Neon blue for main actions and highlights
    secondary: '#B643FF', // Purple for secondary elements
    accent: '#00F5FF', // Cyan for special highlights (like "The System" text)
    
    // Background colors
    background: {
      dark: '#0A0A0C', // Main background (almost black)
      darker: '#050507', // Darker sections
      card: '#13131A', // Card backgrounds
      modal: '#1A1A23', // Modal backgrounds
    },
    
    // Text colors
    text: {
      primary: '#FFFFFF',
      secondary: '#B4B4C7',
      disabled: '#6E6E8F',
      accent: '#00F5FF', // System text
    },
    
    // Status colors
    status: {
      success: '#36E2B4', // Green for completed quests
      warning: '#FFCC00', // Yellow for in-progress
      danger: '#FF3864', // Red for failed/danger
      info: '#4361EE', // Blue for info
    },
    
    // Rank colors
    rank: {
      e: '#8D8D9C', // E-Rank (Gray)
      d: '#36E2B4', // D-Rank (Green)
      c: '#4361EE', // C-Rank (Blue)
      b: '#B643FF', // B-Rank (Purple)
      a: '#FFCC00', // A-Rank (Gold)
      s: '#FF3864', // S-Rank (Red)
    },
    
    // Stats colors
    stats: {
      str: '#FF3864', // Strength (Red)
      agi: '#36E2B4', // Agility (Green)
      end: '#4361EE', // Endurance (Blue)
    },
  },
  
  // Font sizes
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  
  // Font families
  fonts: {
    heading: '"Orbitron", sans-serif', // Futuristic font for headings
    body: '"Rajdhani", sans-serif', // Clean, readable font for body text
    system: '"Orbitron", sans-serif', // For system messages
  },
  
  // Border radius
  borderRadius: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    xl: '1rem',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px rgba(0, 245, 255, 0.05)',
    md: '0 4px 6px rgba(0, 245, 255, 0.1)',
    lg: '0 10px 15px rgba(0, 245, 255, 0.1)',
    xl: '0 20px 25px rgba(0, 245, 255, 0.1)',
    glow: '0 0 10px rgba(0, 245, 255, 0.5), 0 0 20px rgba(0, 245, 255, 0.3)',
    neonBlue: '0 0 5px rgba(67, 97, 238, 0.7), 0 0 20px rgba(67, 97, 238, 0.5)',
    neonPurple: '0 0 5px rgba(182, 67, 255, 0.7), 0 0 20px rgba(182, 67, 255, 0.5)',
  },
  
  // Animations
  animations: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};
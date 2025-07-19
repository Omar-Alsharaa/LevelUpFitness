import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${props => props.theme.fonts.body};
    background-color: ${props => props.theme.colors.background.dark};
    color: ${props => props.theme.colors.text.primary};
    min-height: 100vh;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main-content {
    flex: 1;
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  /* Glowing text effect for system messages */
  .system-text {
    color: ${props => props.theme.colors.text.accent};
    text-shadow: ${props => props.theme.shadows.glow};
    font-family: ${props => props.theme.fonts.system};
  }

  /* Card styling */
  .card {
    background-color: ${props => props.theme.colors.background.card};
    border-radius: ${props => props.theme.borderRadius.lg};
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(67, 97, 238, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: ${props => props.theme.shadows.neonBlue};
    }
  }

  /* Button styling */
  button {
    font-family: ${props => props.theme.fonts.heading};
    padding: 0.75rem 1.5rem;
    border-radius: ${props => props.theme.borderRadius.md};
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    letter-spacing: 0.5px;
    
    &.primary {
      background-color: ${props => props.theme.colors.primary};
      color: white;
      box-shadow: 0 0 10px rgba(67, 97, 238, 0.5);
      
      &:hover {
        background-color: #3651d8;
        box-shadow: ${props => props.theme.shadows.neonBlue};
      }
    }
    
    &.secondary {
      background-color: ${props => props.theme.colors.secondary};
      color: white;
      box-shadow: 0 0 10px rgba(182, 67, 255, 0.5);
      
      &:hover {
        background-color: #a32df0;
        box-shadow: ${props => props.theme.shadows.neonPurple};
      }
    }
    
    &.outline {
      background-color: transparent;
      border: 2px solid ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.primary};
      
      &:hover {
        background-color: rgba(67, 97, 238, 0.1);
      }
    }
  }

  /* System notification */
  .system-notification {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(10, 10, 12, 0.8);
    border: 1px solid ${props => props.theme.colors.text.accent};
    border-radius: ${props => props.theme.borderRadius.md};
    padding: 1rem 2rem;
    color: ${props => props.theme.colors.text.accent};
    font-family: ${props => props.theme.fonts.system};
    text-shadow: ${props => props.theme.shadows.glow};
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
    
    &.visible {
      opacity: 1;
    }
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background.darker};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #3651d8;
  }

  /* Rank badges */
  .rank-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 0.75rem;
    border-radius: ${props => props.theme.borderRadius.full};
    font-weight: bold;
    font-size: ${props => props.theme.fontSizes.sm};
    text-transform: uppercase;
    
    &.rank-e {
      background-color: ${props => props.theme.colors.rank.e};
      color: ${props => props.theme.colors.background.dark};
    }
    
    &.rank-d {
      background-color: ${props => props.theme.colors.rank.d};
      color: ${props => props.theme.colors.background.dark};
    }
    
    &.rank-c {
      background-color: ${props => props.theme.colors.rank.c};
      color: white;
    }
    
    &.rank-b {
      background-color: ${props => props.theme.colors.rank.b};
      color: white;
    }
    
    &.rank-a {
      background-color: ${props => props.theme.colors.rank.a};
      color: ${props => props.theme.colors.background.dark};
    }
    
    &.rank-s {
      background-color: ${props => props.theme.colors.rank.s};
      color: white;
      box-shadow: 0 0 10px rgba(255, 56, 100, 0.7);
    }
  }

  /* Stats bars */
  .stat-bar {
    height: 8px;
    border-radius: ${props => props.theme.borderRadius.full};
    background-color: ${props => props.theme.colors.background.darker};
    margin-bottom: 0.5rem;
    overflow: hidden;
    
    .stat-fill {
      height: 100%;
      border-radius: ${props => props.theme.borderRadius.full};
      transition: width 1s ease-out;
      
      &.str {
        background-color: ${props => props.theme.colors.stats.str};
      }
      
      &.agi {
        background-color: ${props => props.theme.colors.stats.agi};
      }
      
      &.end {
        background-color: ${props => props.theme.colors.stats.end};
      }
    }
  }

  /* XP progress bar */
  .xp-bar {
    height: 10px;
    border-radius: ${props => props.theme.borderRadius.full};
    background-color: ${props => props.theme.colors.background.darker};
    margin: 1rem 0;
    overflow: hidden;
    position: relative;
    
    .xp-fill {
      height: 100%;
      background: linear-gradient(90deg, 
        ${props => props.theme.colors.primary} 0%, 
        ${props => props.theme.colors.secondary} 100%);
      border-radius: ${props => props.theme.borderRadius.full};
      transition: width 0.5s ease-out;
    }
  }
`;
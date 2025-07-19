import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Leaderboard from './Leaderboard';

// Mock theme for styled-components
const theme = {
  colors: {
    primary: '#4361ee',
    background: {
      card: '#1a1b25',
      darker: '#141520',
      dark: '#0f1018'
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
      accent: '#00f5ff'
    },
    rank: {
      s: '#ffcc00',
      a: '#ffffff',
      b: '#ff9966',
      c: '#4361ee',
      d: '#36e2b4',
      e: '#ff3864'
    },
    stats: {
      str: '#ff3864',
      agi: '#36e2b4',
      end: '#4361ee'
    },
    status: {
      success: '#36e2b4',
      danger: '#ff3864'
    }
  },
  fonts: {
    heading: '"Rajdhani", sans-serif',
    body: '"Inter", sans-serif',
    system: '"Share Tech Mono", monospace'
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem'
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  },
  shadows: {
    neonBlue: '0 0 10px rgba(67, 97, 238, 0.5)',
    glow: '0 0 5px #00f5ff'
  }
};

// Mock components
jest.mock('../components/leaderboard/GuildLeaderboard', () => {
  return function MockGuildLeaderboard() {
    return <div data-testid="guild-leaderboard">Guild Leaderboard Mock</div>;
  };
});

jest.mock('../components/leaderboard/UserChallenges', () => {
  return function MockUserChallenges() {
    return <div data-testid="user-challenges">User Challenges Mock</div>;
  };
});

jest.mock('../components/leaderboard/Pagination', () => {
  return function MockPagination() {
    return <div data-testid="pagination">Pagination Mock</div>;
  };
});

const renderWithTheme = (ui) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

describe('Leaderboard Component', () => {
  test('renders the leaderboard title', () => {
    renderWithTheme(<Leaderboard />);
    expect(screen.getByText('Global Hunter Rankings')).toBeInTheDocument();
  });

  test('renders the system message', () => {
    renderWithTheme(<Leaderboard />);
    expect(screen.getByText(/The System is monitoring all hunters/i)).toBeInTheDocument();
  });

  test('renders the user rank card', () => {
    renderWithTheme(<Leaderboard />);
    expect(screen.getByText('Your Current Rank')).toBeInTheDocument();
    expect(screen.getByText(/Top \d+% of all Hunters/)).toBeInTheDocument();
  });

  test('switches between tabs correctly', () => {
    renderWithTheme(<Leaderboard />);
    
    // Default tab should be hunters
    expect(screen.getByText('Global')).toBeInTheDocument();
    
    // Click on Guilds tab
    fireEvent.click(screen.getByText('Guilds'));
    expect(screen.getByTestId('guild-leaderboard')).toBeInTheDocument();
    
    // Click on Challenges tab
    fireEvent.click(screen.getByText('Challenges'));
    expect(screen.getByTestId('user-challenges')).toBeInTheDocument();
    
    // Back to Hunters tab
    fireEvent.click(screen.getByText('Hunters'));
    expect(screen.getByText('Global')).toBeInTheDocument();
  });

  test('filters hunters correctly', () => {
    renderWithTheme(<Leaderboard />);
    
    // Default filter should be global
    const globalButton = screen.getByText('Global');
    expect(globalButton).toHaveStyle(`background-color: ${theme.colors.primary}`);
    
    // Click on Strength filter
    fireEvent.click(screen.getByText('Strength'));
    expect(screen.getByText('Strength')).toHaveStyle(`background-color: ${theme.colors.primary}`);
    expect(globalButton).not.toHaveStyle(`background-color: ${theme.colors.primary}`);
  });

  test('renders pagination component', () => {
    renderWithTheme(<Leaderboard />);
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
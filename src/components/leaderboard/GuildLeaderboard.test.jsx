import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import GuildLeaderboard from './GuildLeaderboard';

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

const renderWithTheme = (ui) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

// Mock guild data
const mockGuilds = [
  {
    id: 1,
    name: 'Iron Legion',
    rank: 's',
    level: 30,
    power: 150000,
    memberCount: 50,
    achievements: [
      { name: 'Boss Slayers', count: 25 },
      { name: 'Fitness Champions', count: 15 },
    ],
  },
  {
    id: 2,
    name: 'Fitness Fanatics',
    rank: 'a',
    level: 25,
    power: 120000,
    memberCount: 45,
    achievements: [
      { name: 'Marathon Masters', count: 30 },
      { name: 'Strength Squad', count: 10 },
    ],
  }
];

describe('GuildLeaderboard Component', () => {
  test('renders the guild leaderboard headers', () => {
    renderWithTheme(<GuildLeaderboard guilds={mockGuilds} userGuildId={1} />);
    expect(screen.getByText('Rank')).toBeInTheDocument();
    expect(screen.getByText('Guild')).toBeInTheDocument();
    expect(screen.getByText('Level')).toBeInTheDocument();
    expect(screen.getByText('Power')).toBeInTheDocument();
    expect(screen.getByText('Achievements')).toBeInTheDocument();
  });

  test('renders guild data correctly', () => {
    renderWithTheme(<GuildLeaderboard guilds={mockGuilds} userGuildId={1} />);
    expect(screen.getByText('Iron Legion')).toBeInTheDocument();
    expect(screen.getByText('Fitness Fanatics')).toBeInTheDocument();
    expect(screen.getByText('Level 30')).toBeInTheDocument();
    expect(screen.getByText('Level 25')).toBeInTheDocument();
    expect(screen.getByText('150,000 Power')).toBeInTheDocument();
    expect(screen.getByText('120,000 Power')).toBeInTheDocument();
  });

  test('highlights user guild correctly', () => {
    renderWithTheme(<GuildLeaderboard guilds={mockGuilds} userGuildId={1} />);
    const userGuildRow = screen.getByText('Iron Legion').closest('div');
    expect(userGuildRow).toHaveStyle(`background-color: rgba(67, 97, 238, 0.1)`);
    expect(userGuildRow).toHaveStyle(`border-left: 3px solid ${theme.colors.primary}`);
  });

  test('displays guild member count', () => {
    renderWithTheme(<GuildLeaderboard guilds={mockGuilds} userGuildId={1} />);
    expect(screen.getByText('50 members')).toBeInTheDocument();
    expect(screen.getByText('45 members')).toBeInTheDocument();
  });

  test('displays guild achievements', () => {
    renderWithTheme(<GuildLeaderboard guilds={mockGuilds} userGuildId={1} />);
    expect(screen.getByText('25')).toBeInTheDocument(); // Boss Slayers count
    expect(screen.getByText('15')).toBeInTheDocument(); // Fitness Champions count
    expect(screen.getByText('30')).toBeInTheDocument(); // Marathon Masters count
    expect(screen.getByText('10')).toBeInTheDocument(); // Strength Squad count
  });
});
import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Quests from './Quests';

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

describe('Quests Component', () => {
  test('renders the quests title', () => {
    renderWithTheme(<Quests />);
    expect(screen.getByText('Available Quests')).toBeInTheDocument();
  });

  test('renders the system message', () => {
    renderWithTheme(<Quests />);
    expect(screen.getByText(/The System has assigned new quests/i)).toBeInTheDocument();
  });

  test('renders quest filters', () => {
    renderWithTheme(<Quests />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Daily')).toBeInTheDocument();
    expect(screen.getByText('Weekly')).toBeInTheDocument();
    expect(screen.getByText('Story')).toBeInTheDocument();
    expect(screen.getByText('Guild')).toBeInTheDocument();
  });

  test('filters quests correctly', () => {
    renderWithTheme(<Quests />);
    
    // Default filter should be 'all'
    const allButton = screen.getByText('All');
    // Instead of checking style directly, check for the active attribute
    expect(allButton).toHaveAttribute('active', 'true');
    
    // Click on Daily filter
    fireEvent.click(screen.getByText('Daily'));
    expect(screen.getByText('Daily')).toHaveAttribute('active', 'true');
    expect(allButton).not.toHaveAttribute('active', 'true');
  });

  test('renders quest cards', () => {
    renderWithTheme(<Quests />);
    expect(screen.getByText('Morning Awakening')).toBeInTheDocument();
    expect(screen.getByText('Cardio Hunter')).toBeInTheDocument();
  });

  test('shows quest details', () => {
    renderWithTheme(<Quests />);
    expect(screen.getByText(/Complete 50 push-ups/i)).toBeInTheDocument();
    expect(screen.getByText(/Run 5km under 30 minutes/i)).toBeInTheDocument();
  });

  test('shows quest rewards', () => {
    renderWithTheme(<Quests />);
    expect(screen.getAllByText(/XP/i).length).toBeGreaterThan(0);
  });

  test('shows completed quests differently', () => {
    renderWithTheme(<Quests />);
    const completedQuest = screen.getByText('Cardio Hunter').closest('div');
    expect(completedQuest).toHaveAttribute('completed', 'true');
  });
});
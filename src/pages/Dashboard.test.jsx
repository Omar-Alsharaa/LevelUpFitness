import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Dashboard from './Dashboard';

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

// Mock data and functions that Dashboard component might need
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useState: jest.fn().mockImplementation(initialValue => [initialValue, jest.fn()]),
    useEffect: jest.fn().mockImplementation(cb => cb())
  };
});

describe('Dashboard Component', () => {
  test('renders the dashboard title', () => {
    renderWithTheme(<Dashboard />);
    expect(screen.getByText(/Hunter Dashboard/i)).toBeInTheDocument();
  });

  test('renders the profile section', () => {
    renderWithTheme(<Dashboard />);
    expect(screen.getByText(/Hunter/i)).toBeInTheDocument(); // Username
    expect(screen.getByText(/Level/i)).toBeInTheDocument();
  });

  test('renders the stats section', () => {
    renderWithTheme(<Dashboard />);
    expect(screen.getByText(/Stats/i)).toBeInTheDocument();
    expect(screen.getByText(/Strength/i)).toBeInTheDocument();
    expect(screen.getByText(/Agility/i)).toBeInTheDocument();
    expect(screen.getByText(/Endurance/i)).toBeInTheDocument();
  });

  test('renders the quests section', () => {
    renderWithTheme(<Dashboard />);
    expect(screen.getByText(/Active Quests/i)).toBeInTheDocument();
  });

  test('renders the system message', () => {
    renderWithTheme(<Dashboard />);
    expect(screen.getByText(/The System/i)).toBeInTheDocument();
  });
});
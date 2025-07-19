import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import UserChallenges from './UserChallenges';

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

// Mock challenge data
const mockChallenges = [
  {
    id: 1,
    challenger: {
      username: 'IronHunter',
      rank: 'a',
    },
    type: 'Strength',
    status: 'pending',
  },
  {
    id: 2,
    challenger: {
      username: 'SpeedDemon',
      rank: 'b',
    },
    type: 'Agility',
    status: 'active',
  },
  {
    id: 3,
    challenger: {
      username: 'FitWarrior',
      rank: 'c',
    },
    type: 'Endurance',
    status: 'completed',
  },
];

describe('UserChallenges Component', () => {
  const mockAcceptChallenge = jest.fn();
  const mockDeclineChallenge = jest.fn();
  const mockCreateChallenge = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the challenges header', () => {
    renderWithTheme(
      <UserChallenges 
        challenges={mockChallenges}
        onAcceptChallenge={mockAcceptChallenge}
        onDeclineChallenge={mockDeclineChallenge}
        onCreateChallenge={mockCreateChallenge}
      />
    );
    expect(screen.getByText('Hunter Challenges')).toBeInTheDocument();
  });

  test('renders the challenge button', () => {
    renderWithTheme(
      <UserChallenges 
        challenges={mockChallenges}
        onAcceptChallenge={mockAcceptChallenge}
        onDeclineChallenge={mockDeclineChallenge}
        onCreateChallenge={mockCreateChallenge}
      />
    );
    const challengeButton = screen.getByText('Challenge Hunter');
    expect(challengeButton).toBeInTheDocument();
    
    fireEvent.click(challengeButton);
    expect(mockCreateChallenge).toHaveBeenCalledTimes(1);
  });

  test('renders challenge cards correctly', () => {
    renderWithTheme(
      <UserChallenges 
        challenges={mockChallenges}
        onAcceptChallenge={mockAcceptChallenge}
        onDeclineChallenge={mockDeclineChallenge}
        onCreateChallenge={mockCreateChallenge}
      />
    );
    expect(screen.getByText('IronHunter')).toBeInTheDocument();
    expect(screen.getByText('SpeedDemon')).toBeInTheDocument();
    expect(screen.getByText('FitWarrior')).toBeInTheDocument();
    
    expect(screen.getByText('Strength Challenge')).toBeInTheDocument();
    expect(screen.getByText('Agility Challenge')).toBeInTheDocument();
    expect(screen.getByText('Endurance Challenge')).toBeInTheDocument();
  });

  test('displays challenge status correctly', () => {
    renderWithTheme(
      <UserChallenges 
        challenges={mockChallenges}
        onAcceptChallenge={mockAcceptChallenge}
        onDeclineChallenge={mockDeclineChallenge}
        onCreateChallenge={mockCreateChallenge}
      />
    );
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  test('shows accept/decline buttons only for pending challenges', () => {
    renderWithTheme(
      <UserChallenges 
        challenges={mockChallenges}
        onAcceptChallenge={mockAcceptChallenge}
        onDeclineChallenge={mockDeclineChallenge}
        onCreateChallenge={mockCreateChallenge}
      />
    );
    expect(screen.getByText('Accept')).toBeInTheDocument();
    expect(screen.getByText('Decline')).toBeInTheDocument();
    
    // Only one set of Accept/Decline buttons should be present (for the pending challenge)
    expect(screen.getAllByRole('button')).toHaveLength(3); // Challenge Hunter + Accept + Decline
  });

  test('accept and decline buttons call the correct handlers', () => {
    renderWithTheme(
      <UserChallenges 
        challenges={mockChallenges}
        onAcceptChallenge={mockAcceptChallenge}
        onDeclineChallenge={mockDeclineChallenge}
        onCreateChallenge={mockCreateChallenge}
      />
    );
    
    fireEvent.click(screen.getByText('Accept'));
    expect(mockAcceptChallenge).toHaveBeenCalledWith(1);
    
    fireEvent.click(screen.getByText('Decline'));
    expect(mockDeclineChallenge).toHaveBeenCalledWith(1);
  });

  test('renders empty state when no challenges', () => {
    renderWithTheme(
      <UserChallenges 
        challenges={[]}
        onAcceptChallenge={mockAcceptChallenge}
        onDeclineChallenge={mockDeclineChallenge}
        onCreateChallenge={mockCreateChallenge}
      />
    );
    expect(screen.getByText(/No active challenges/i)).toBeInTheDocument();
  });
});
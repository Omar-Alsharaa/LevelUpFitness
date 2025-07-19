import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Pagination from './Pagination';

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
    }
  },
  borderRadius: {
    md: '0.375rem',
  },
  fontSizes: {
    sm: '0.875rem',
  }
};

const renderWithTheme = (ui) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

describe('Pagination Component', () => {
  const mockPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders pagination with correct number of pages', () => {
    renderWithTheme(
      <Pagination 
        currentPage={1} 
        totalPages={5} 
        onPageChange={mockPageChange} 
      />
    );
    
    // Should show page numbers 1-5
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('highlights current page', () => {
    renderWithTheme(
      <Pagination 
        currentPage={3} 
        totalPages={5} 
        onPageChange={mockPageChange} 
      />
    );
    
    // Page 3 should be highlighted
    const page3Button = screen.getByText('3');
    expect(page3Button).toHaveStyle(`background-color: ${theme.colors.primary}`);
    
    // Other pages should not be highlighted
    const page1Button = screen.getByText('1');
    expect(page1Button).not.toHaveStyle(`background-color: ${theme.colors.primary}`);
  });

  test('calls onPageChange when a page is clicked', () => {
    renderWithTheme(
      <Pagination 
        currentPage={1} 
        totalPages={5} 
        onPageChange={mockPageChange} 
      />
    );
    
    // Click on page 3
    fireEvent.click(screen.getByText('3'));
    expect(mockPageChange).toHaveBeenCalledWith(3);
    
    // Click on page 5
    fireEvent.click(screen.getByText('5'));
    expect(mockPageChange).toHaveBeenCalledWith(5);
  });

  test('does not call onPageChange when current page is clicked', () => {
    renderWithTheme(
      <Pagination 
        currentPage={2} 
        totalPages={5} 
        onPageChange={mockPageChange} 
      />
    );
    
    // Click on current page (2)
    fireEvent.click(screen.getByText('2'));
    expect(mockPageChange).not.toHaveBeenCalled();
  });

  test('handles single page case', () => {
    renderWithTheme(
      <Pagination 
        currentPage={1} 
        totalPages={1} 
        onPageChange={mockPageChange} 
      />
    );
    
    // Should only show page 1
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
  });
});
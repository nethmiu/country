import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import { UserContext } from '../context/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';

const mockContextValueLightMode = {
  userPrefs: { darkMode: false, visitedCountries: [] },
  toggleDarkMode: jest.fn(),
};

const mockContextValueDarkMode = {
  userPrefs: { darkMode: true, visitedCountries: [{}, {}] },
  toggleDarkMode: jest.fn(),
};

describe('Navbar', () => {
  it('renders the brand logo and name in light mode', () => {
    render(
      <Router>
        <UserContext.Provider value={mockContextValueLightMode}>
          <Navbar />
        </UserContext.Provider>
      </Router>
    );
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'World logo');
    expect(screen.getByText('Countries Explorer')).toBeInTheDocument();
    expect(screen.getByText('🌙 Dark Mode')).toBeInTheDocument();
    expect(screen.getByText('🌍 Visited: 0')).toBeInTheDocument();
  });

  it('renders the brand logo and name in dark mode with visited count', () => {
    render(
      <Router>
        <UserContext.Provider value={mockContextValueDarkMode}>
          <Navbar />
        </UserContext.Provider>
      </Router>
    );
    expect(screen.getByText('☀️ Light Mode')).toBeInTheDocument();
    expect(screen.getByText('🌍 Visited: 2')).toBeInTheDocument();
  });

  it('calls toggleDarkMode when the dark/light mode button is clicked', () => {
    render(
      <Router>
        <UserContext.Provider value={mockContextValueLightMode}>
          <Navbar />
        </UserContext.Provider>
      </Router>
    );
    const darkModeButton = screen.getByText('🌙 Dark Mode');
    fireEvent.click(darkModeButton);
    expect(mockContextValueLightMode.toggleDarkMode).toHaveBeenCalledTimes(1);
  });

  it('renders Home and Favorites links', () => {
    render(
      <Router>
        <UserContext.Provider value={mockContextValueLightMode}>
          <Navbar />
        </UserContext.Provider>
      </Router>
    );
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Favorites' })).toHaveAttribute('href', '/favorites');
  });
});
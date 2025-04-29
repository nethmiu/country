import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CountryCard from './CountryCard';
import { UserContext } from '../context/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';

const mockCountry = {
  name: { common: 'Sri Lanka' },
  flags: { png: 'sl_flag.png' },
  population: 20000000,
  region: 'Asia',
  capital: ['Colombo'],
  cca3: 'LKA',
};

const mockContextValue = {
  userPrefs: { favoriteCountries: [] },
  addVisitedCountry: jest.fn(),
  toggleFavorite: jest.fn(),
};

const mockContextValueIsFavorite = {
  userPrefs: { favoriteCountries: [mockCountry] },
  addVisitedCountry: jest.fn(),
  toggleFavorite: jest.fn(),
};

describe('CountryCard', () => {
  it('renders country name, flag, population, region, and capital', () => {
    render(
      <Router>
        <UserContext.Provider value={mockContextValue}>
          <CountryCard country={mockCountry} />
        </UserContext.Provider>
      </Router>
    );

    expect(screen.getByText('Sri Lanka')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'sl_flag.png');
    expect(screen.getByText('Population: 20,000,000')).toBeInTheDocument();
    expect(screen.getByText('Region: Asia')).toBeInTheDocument();
    expect(screen.getByText('Capital: Colombo')).toBeInTheDocument();
    expect(screen.getByText('🤍')).toBeInTheDocument(); // Not a favorite initially
  });

  it('calls addVisitedCountry and navigates on card click', () => {
    const mockNavigate = jest.fn();
    render(
      <Router>
        <UserContext.Provider value={mockContextValue}>
          <CountryCard country={mockCountry} />
        </UserContext.Provider>
      </Router>
    );

    // Mock useNavigate
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    fireEvent.click(screen.getByRole('article')); // Assuming Card renders as an article
    expect(mockContextValue.addVisitedCountry).toHaveBeenCalledWith(mockCountry);
    expect(mockNavigate).toHaveBeenCalledWith('/country/LKA');

    // Restore mock
    jest.unmock('react-router-dom');
  });

  it('calls toggleFavorite on favorite button click', () => {
    render(
      <Router>
        <UserContext.Provider value={mockContextValue}>
          <CountryCard country={mockCountry} />
        </UserContext.Provider>
      </Router>
    );

    const favoriteButton = screen.getByRole('button', { name: /🤍|❤️/ });
    fireEvent.click(favoriteButton);
    expect(mockContextValue.toggleFavorite).toHaveBeenCalledWith(mockCountry);
  });

  it('renders heart icon as red if the country is a favorite', () => {
    render(
      <Router>
        <UserContext.Provider value={mockContextValueIsFavorite}>
          <CountryCard country={mockCountry} />
        </UserContext.Provider>
      </Router>
    );

    expect(screen.getByText('❤️')).toBeInTheDocument();
  });
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import Favorites from '../pages/Favorites';
import { UserContext } from '../context/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';

const mockFavoriteCountries = [
  { name: { common: 'Australia' }, cca3: 'AUS' },
  { name: { common: 'New Zealand' }, cca3: 'NZL' },
];

const mockContextWithFavorites = {
  userPrefs: { favoriteCountries: mockFavoriteCountries },
};

const mockContextWithoutFavorites = {
  userPrefs: { favoriteCountries: [] },
};

describe('Favorites', () => {
  it('renders the heading "Your Favorite Countries"', () => {
    render(
      <Router>
        <UserContext.Provider value={mockContextWithoutFavorites}>
          <Favorites />
        </UserContext.Provider>
      </Router>
    );
    expect(screen.getByText('Your Favorite Countries')).toBeInTheDocument();
  });

  it('renders "You haven\'t added any favorites yet." message when no favorites are added', () => {
    render(
      <Router>
        <UserContext.Provider value={mockContextWithoutFavorites}>
          <Favorites />
        </UserContext.Provider>
      </Router>
    );
    expect(screen.getByText("You haven't added any favorites yet.")).toBeInTheDocument();
  });

  it('renders CountryCard for each favorite country', () => {
    render(
      <Router>
        <UserContext.Provider value={mockContextWithFavorites}>
          <Favorites />
        </UserContext.Provider>
      </Router>
    );
    expect(screen.getByText('Australia')).toBeInTheDocument();
    expect(screen.getByText('New Zealand')).toBeInTheDocument();
  });

  it('does not render the "no favorites" message when there are favorite countries', () => {
    render(
      <Router>
        <UserContext.Provider value={mockContextWithFavorites}>
          <Favorites />
        </UserContext.Provider>
      </Router>
    );
    expect(screen.queryByText("You haven't added any favorites yet.")).toBeNull();
  });
});
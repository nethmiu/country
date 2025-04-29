import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { UserContext, UserProvider } from '../context/UserContext';

const TestComponent = () => {
  const context = React.useContext(UserContext);
  return (
    <div>
      <span data-testid="dark-mode">{context.userPrefs.darkMode.toString()}</span>
      <button onClick={context.toggleDarkMode}>Toggle Dark Mode</button>
      <span data-testid="visited-count">{context.userPrefs.visitedCountries.length}</span>
      <button onClick={() => context.addVisitedCountry({ cca3: 'LKA', name: { common: 'Sri Lanka' } })}>Add Visited</button>
      <span data-testid="favorite-count">{context.userPrefs.favoriteCountries.length}</span>
      <button onClick={() => context.toggleFavorite({ cca3: 'USA', name: { common: 'United States' } })}>Toggle Favorite USA</button>
      <button onClick={() => context.toggleFavorite({ cca3: 'USA', name: { common: 'United States' } })}>Untoggle Favorite USA</button>
      <button onClick={() => context.toggleFavorite({ cca3: 'CAN', name: { common: 'Canada' } })}>Toggle Favorite CAN</button>
    </div>
  );
};

describe('UserContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test to ensure isolation
    localStorage.clear();
  });

  it('provides default values for darkMode, visitedCountries, and favoriteCountries', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    expect(screen.getByTestId('dark-mode')).toHaveTextContent('false');
    expect(screen.getByTestId('visited-count')).toHaveTextContent('0');
    expect(screen.getByTestId('favorite-count')).toHaveTextContent('0');
  });

  it('toggles darkMode state', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    expect(screen.getByTestId('dark-mode')).toHaveTextContent('false');
    act(() => {
      screen.getByText('Toggle Dark Mode').click();
    });
    expect(screen.getByTestId('dark-mode')).toHaveTextContent('true');
    act(() => {
      screen.getByText('Toggle Dark Mode').click();
    });
    expect(screen.getByTestId('dark-mode')).toHaveTextContent('false');
  });

  it('adds a country to visitedCountries', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    expect(screen.getByTestId('visited-count')).toHaveTextContent('0');
    act(() => {
      screen.getByText('Add Visited').click();
    });
    expect(screen.getByTestId('visited-count')).toHaveTextContent('1');
    // Adding the same country again should not increase the count
    act(() => {
      screen.getByText('Add Visited').click();
    });
    expect(screen.getByTestId('visited-count')).toHaveTextContent('1');
  });

  it('toggles a country in favoriteCountries', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    expect(screen.getByTestId('favorite-count')).toHaveTextContent('0');
    act(() => {
      screen.getByText('Toggle Favorite USA').click();
    });
    expect(screen.getByTestId('favorite-count')).toHaveTextContent('1');
    act(() => {
      screen.getByText('Untoggle Favorite USA').click();
    });
    expect(screen.getByTestId('favorite-count')).toHaveTextContent('0');
    act(() => {
      screen.getByText('Toggle Favorite CAN').click();
    });
    expect(screen.getByTestId('favorite-count')).toHaveTextContent('1');
  });

  it('loads preferences from localStorage on initial render', () => {
    localStorage.setItem('countryExplorerPrefs', JSON.stringify({ darkMode: true, visitedCountries: [{ cca3: 'AUS', name: { common: 'Australia' } }], favoriteCountries: [{ cca3: 'NZL', name: { common: 'New Zealand' } }] }));
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    expect(screen.getByTestId('dark-mode')).toHaveTextContent('true');
    expect(screen.getByTestId('visited-count')).toHaveTextContent('1');
    expect(screen.getByTestId('favorite-count')).toHaveTextContent('1');
  });

  it('saves preferences to localStorage when state changes', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    expect(localStorage.getItem('countryExplorerPrefs')).toBeNull();

    act(() => {
      screen.getByText('Toggle Dark Mode').click();
    });
    expect(JSON.parse(localStorage.getItem('countryExplorerPrefs')).darkMode).toBe(true);

    act(() => {
      screen.getByText('Add Visited').click();
    });
    expect(JSON.parse(localStorage.getItem('countryExplorerPrefs')).visitedCountries.length).toBe(1);

    act(() => {
      screen.getByText('Toggle Favorite USA').click();
    });
    expect(JSON.parse(localStorage.getItem('countryExplorerPrefs')).favoriteCountries.length).toBe(1);
  });
});
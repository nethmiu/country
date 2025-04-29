// src/context/UserContext.js
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  // Initialize state from localStorage or defaults
  const [userPrefs, setUserPrefs] = useState(() => {
    const savedPrefs = localStorage.getItem('countryExplorerPrefs');
    return savedPrefs ? JSON.parse(savedPrefs) : {
      darkMode: false,
      visitedCountries: [],
      favoriteCountries: []
    };
  });

  // Save to localStorage whenever preferences change
  useEffect(() => {
    localStorage.setItem('countryExplorerPrefs', JSON.stringify(userPrefs));
  }, [userPrefs]);

  const toggleDarkMode = () => {
    setUserPrefs(prev => ({
      ...prev,
      darkMode: !prev.darkMode
    }));
  };

  const addVisitedCountry = (country) => {
    if (!userPrefs.visitedCountries.some(c => c.cca3 === country.cca3)) {
      setUserPrefs(prev => ({
        ...prev,
        visitedCountries: [...prev.visitedCountries, country]
      }));
    }
  };

  const toggleFavorite = (country) => {
    setUserPrefs(prev => {
      const isFavorite = prev.favoriteCountries.some(c => c.cca3 === country.cca3);
      return {
        ...prev,
        favoriteCountries: isFavorite
          ? prev.favoriteCountries.filter(c => c.cca3 !== country.cca3)
          : [...prev.favoriteCountries, country]
      };
    });
  };

  return (
    <UserContext.Provider value={{
      userPrefs,
      toggleDarkMode,
      addVisitedCountry,
      toggleFavorite
    }}>
      {children}
    </UserContext.Provider>
  );
}
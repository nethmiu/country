// src/components/CountryCard.js
import { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function CountryCard({ country }) {
  const navigate = useNavigate();
  const { userPrefs, addVisitedCountry, toggleFavorite } = useContext(UserContext);
  const isFavorite = userPrefs.favoriteCountries.some(c => c.cca3 === country.cca3);

  const handleClick = () => {
    addVisitedCountry(country);
    navigate(`/country/${country.cca3}`);
  };

  const handleFavorite = (e) => {
    e.stopPropagation(); // Prevent card click when clicking favorite button
    toggleFavorite(country);
  };

  return (
    <Card 
      onClick={handleClick} 
      style={{
        cursor: 'pointer',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s',
        overflow: 'hidden',
        backgroundColor: '#d0f0fd' // Light blue background color
      }}
      className="mb-4"
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <Card.Img 
        variant="top" 
        src={country.flags?.png} 
        style={{ height: '160px', objectFit: 'cover' }}
      />
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <Card.Title style={{ fontSize: '1.1rem', fontWeight: '600' }}>
            {country.name?.common}
          </Card.Title>
          <button 
            onClick={handleFavorite}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.25rem',
              cursor: 'pointer',
              padding: 0
            }}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
        <Card.Text style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}>
          <strong>Population:</strong> {country.population?.toLocaleString()}<br />
          <strong>Region:</strong> {country.region}<br />
          <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

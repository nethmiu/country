// src/pages/Favorites.js
import { useContext } from 'react';
import { Row, Col, Container, Alert } from 'react-bootstrap';
import CountryCard from '../components/CountryCard';
import { UserContext } from '../context/UserContext';

export default function Favorites() {
  const { userPrefs } = useContext(UserContext);

  return (
    <Container>
      <h2 className="my-4">Your Favorite Countries</h2>
      
      {userPrefs.favoriteCountries.length === 0 ? (
        <Alert variant="info">
          You haven't added any favorites yet.
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {userPrefs.favoriteCountries.map(country => (
            <Col key={country.cca3}>
              <CountryCard country={country} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
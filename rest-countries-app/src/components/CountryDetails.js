import { useContext, useEffect, useState } from 'react'; // Add useState here
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Row, ListGroup, Badge } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

export default function CountryDetails() {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null); // Now correctly defined
  const [loading, setLoading] = useState(true); // Now correctly defined
  const [error, setError] = useState(null); // Now correctly defined
  const { userPrefs, addVisitedCountry } = useContext(UserContext);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        setCountry(response.data[0]);
        addVisitedCountry(response.data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryCode, addVisitedCountry]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">Error: {error}</div>;

  return (
    <div>
      <Button variant="outline-primary" onClick={() => navigate(-1)} className="mb-4">
        ← Back
      </Button>

      <Card>
        <Row className="g-0">
          <Col md={6}>
            <Card.Img 
              src={country.flags?.png || 'https://via.placeholder.com/800x600?text=No+Flag'} 
              className="img-fluid"
            />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title className="display-4">{country.name?.common}</Card.Title>
              
              <Row className="mt-4">
                <Col md={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Native Name:</strong> {Object.values(country.name?.nativeName || {})[0]?.common || 'N/A'}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Population:</strong> {country.population?.toLocaleString()}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Region:</strong> {country.region}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Sub Region:</strong> {country.subregion || 'N/A'}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Top Level Domain:</strong> {country.tld?.[0] || 'N/A'}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Currencies:</strong> {Object.values(country.currencies || {}).map(c => c.name).join(', ') || 'N/A'}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Languages:</strong> {Object.values(country.languages || {}).join(', ') || 'N/A'}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>

              {country.borders && (
                <div className="mt-4">
                  <h5>Border Countries:</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {country.borders.map(border => (
                      <Badge 
                        key={border} 
                        bg="primary" 
                        className="p-2" 
                        onClick={() => navigate(`/country/${border}`)}
                        style={{ cursor: 'pointer' }}
                      >
                        {border}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
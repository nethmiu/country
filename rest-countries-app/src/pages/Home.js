import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Container, Spinner, Alert } from 'react-bootstrap';
import Search from '../components/Search';
import Filter from '../components/Filter';
import CountryCard from '../components/CountryCard';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
        setFilteredCountries(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredCountries(countries);
      return;
    }

    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleFilter = (region) => {
    if (!region) {
      setFilteredCountries(countries);
      return;
    }

    const filtered = countries.filter(country => country.region === region);
    setFilteredCountries(filtered);
  };

  if (loading) return (
    <Container className="text-center mt-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );

  if (error) return (
    <Container className="mt-5">
      <Alert variant="danger">
        Error fetching countries: {error}
      </Alert>
    </Container>
  );

  return (
    <Container>
      <Row className="mb-4">
        <Col md={6}>
          <Search onSearch={handleSearch} />
        </Col>
        <Col md={3} className="ms-auto">
          <Filter onFilter={handleFilter} />
        </Col>
      </Row>

      {filteredCountries.length === 0 ? (
        <Alert variant="info" className="text-center">
          No countries found matching your criteria.
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {filteredCountries.map(country => (
            <Col key={country.cca3}>
              <CountryCard country={country} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
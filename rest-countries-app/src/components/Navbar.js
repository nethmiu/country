import { useContext } from 'react';
import { Navbar as BSNavbar, Container, Nav } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { userPrefs } = useContext(UserContext);

  const navbarStyles = {
    backgroundColor: '#001f3f', // Navy blue
    padding: '0.8rem 0',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
    position: 'sticky',
    top: 0,
    zIndex: 1000
  };

  const brandStyles = {
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    letterSpacing: '0.5px'
  };

  const navLinkStyles = {
    color: '#ffffff',
    fontWeight: 500,
    padding: '0.5rem 1rem',
    margin: '0 0.25rem',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.93)',
      color: '#ffffff'
    }
  };

  const counterStyles = {
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: '0.35rem 0.75rem',
    borderRadius: '20px',
    fontSize: '1.1rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center'
  };

  const logoStyles = {
    marginRight: '12px',
    filter: 'brightness(0) invert(1)'
  };

  return (
    <BSNavbar style={navbarStyles} expand="lg" variant="dark">
      <Container>
        <BSNavbar.Brand as={Link} to="/" style={brandStyles}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3212/3212567.png"
            width="70"
            height="70"
            className="d-inline-block align-top"
            alt="World logo"
            style={logoStyles}
          />
          Countries Explorer
        </BSNavbar.Brand>
        
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ alignItems: 'center' }}>
            <Nav.Link as={Link} to="/" style={navLinkStyles}>Home</Nav.Link>
            <Nav.Link as={Link} to="/favorites" style={navLinkStyles}>Favorites</Nav.Link>
            
            <div style={counterStyles}>
              🌍 Visited: {userPrefs.visitedCountries.length}
            </div>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}
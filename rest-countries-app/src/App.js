import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CountryPage from './pages/CountryPage';
import Navbar from './components/Navbar';
import { UserProvider } from './context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Favorites from './pages/Favorites';

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:countryCode" element={<CountryPage />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
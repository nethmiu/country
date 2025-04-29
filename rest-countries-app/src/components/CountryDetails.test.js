import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CountryDetails from './CountryDetails';
import { UserContext } from '../context/UserContext';
import { BrowserRouter as Router, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

const mockCountryDetails = {
  name: { common: 'Sri Lanka', nativeName: { sin: { common: 'ශ්‍රී ලංකා' } } },
  flags: { png: 'sl_flag_large.png' },
  population: 20000000,
  region: 'Asia',
  subregion: 'Southern Asia',
  capital: ['Colombo'],
  tld: ['.lk'],
  currencies: { LKR: { name: 'Sri Lankan rupee', symbol: 'රු' } },
  languages: { sin: 'Sinhala', tam: 'Tamil' },
  borders: ['IND', 'MDV'],
  cca3: 'LKA',
};

const mockContextValue = {
  addVisitedCountry: jest.fn(),
};

describe('CountryDetails', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ countryCode: 'LKA' });
    axios.get.mockResolvedValue({ data: [mockCountryDetails] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and renders country details correctly', async () => {
    render(
      <Router>
        <UserContext.Provider value={mockContextValue}>
          <CountryDetails />
        </UserContext.Provider>
      </Router>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/alpha/LKA'));

    expect(screen.getByText('Sri Lanka')).toBeInTheDocument();
    expect(screen.getByText('ශ්‍රී ලංකා')).toBeInTheDocument();
    expect(screen.getByText('Population: 20,000,000')).toBeInTheDocument();
    expect(screen.getByText('Region: Asia')).toBeInTheDocument();
    expect(screen.getByText('Sub Region: Southern Asia')).toBeInTheDocument();
    expect(screen.getByText('Capital: Colombo')).toBeInTheDocument();
    expect(screen.getByText('Top Level Domain: .lk')).toBeInTheDocument();
    expect(screen.getByText('Currencies: Sri Lankan rupee')).toBeInTheDocument();
    expect(screen.getByText('Languages: Sinhala, Tamil')).toBeInTheDocument();
    expect(screen.getByText('Border Countries:')).toBeInTheDocument();
    expect(screen.getByText('IND')).toBeInTheDocument();
    expect(screen.getByText('MDV')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'sl_flag_large.png');
    expect(mockContextValue.addVisitedCountry).toHaveBeenCalledWith(mockCountryDetails);
  });

  it('renders loading state', () => {
    axios.get.mockReturnValue(new Promise(() => {})); // Simulate pending promise
    render(
      <Router>
        <UserContext.Provider value={mockContextValue}>
          <CountryDetails />
        </UserContext.Provider>
      </Router>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state if fetch fails', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch'));
    render(
      <Router>
        <UserContext.Provider value={mockContextValue}>
          <CountryDetails />
        </UserContext.Provider>
      </Router>
    );
    await waitFor(() => expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument());
  });

  it('navigates back on button click', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    render(
      <Router>
        <UserContext.Provider value={mockContextValue}>
          <CountryDetails />
        </UserContext.Provider>
      </Router>
    );
    fireEvent.click(screen.getByText('← Back'));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('navigates to border country on badge click', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    render(
      <Router>
        <UserContext.Provider value={mockContextValue}>
          <CountryDetails />
        </UserContext.Provider>
      </Router>
    );
    fireEvent.click(screen.getByText('IND'));
    expect(mockNavigate).toHaveBeenCalledWith('/country/IND');
  });
});
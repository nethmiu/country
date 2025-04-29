import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Home from '../pages/Home';
import axios from 'axios';
import { UserProvider } from '../context/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

const mockCountries = [
  { name: { common: 'Sri Lanka' }, cca3: 'LKA', region: 'Asia' },
  { name: { common: 'Canada' }, cca3: 'CAN', region: 'Americas' },
];

describe('Home', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockCountries });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and renders countries on mount', async () => {
    render(
      <Router>
        <UserProvider>
          <Home />
        </UserProvider>
      </Router>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/all'));
    expect(screen.getByText('Sri Lanka')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
  });

  it('renders loading state initially', () => {
    axios.get.mockReturnValue(new Promise(() => {})); // Simulate pending promise
    render(
      <Router>
        <UserProvider>
          <Home />
        </UserProvider>
      </Router>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state if fetch fails', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch'));
    render(
      <Router>
        <UserProvider>
          <Home />
        </UserProvider>
      </Router>
    );
    await waitFor(() => expect(screen.getByText('Error fetching countries: Failed to fetch')).toBeInTheDocument());
  });

  it('filters countries based on search term', async () => {
    render(
      <Router>
        <UserProvider>
          <Home />
        </UserProvider>
      </Router>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'sri' } });
    await waitFor(() => expect(screen.getByText('Sri Lanka')).toBeInTheDocument());
    expect(screen.queryByText('Canada')).toBeNull();

    fireEvent.change(searchInput, { target: { value: '' } });
    await waitFor(() => expect(screen.getByText('Canada')).toBeInTheDocument());
  });

  it('filters countries based on region', async () => {
    render(
      <Router>
        <UserProvider>
          <Home />
        </UserProvider>
      </Router>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    const regionSelect = screen.getByLabelText('Filter by region');
    fireEvent.change(regionSelect, { target: { value: 'Asia' } });
    await waitFor(() => expect(screen.getByText('Sri Lanka')).toBeInTheDocument());
    expect(screen.queryByText('Canada')).toBeNull();

    fireEvent.change(regionSelect, { target: { value: '' } });
    await waitFor(() => expect(screen.getByText('Canada')).toBeInTheDocument());
  });

  it('renders "No countries found" message when no matching countries are found after search', async () => {
    render(
      <Router>
        <UserProvider>
          <Home />
        </UserProvider>
      </Router>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'no match' } });
    await waitFor(() => expect(screen.getByText('No countries found matching your criteria.')).toBeInTheDocument());
  });

  it('renders "No countries found" message when no matching countries are found after filter', async () => {
    render(
      <Router>
        <UserProvider>
          <Home />
        </UserProvider>
      </Router>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    const regionSelect = screen.getByLabelText('Filter by region');
    fireEvent.change(regionSelect, { target: { value: 'Europe' } });
    await waitFor(() => expect(screen.getByText('No countries found matching your criteria.')).toBeInTheDocument());
  });
});
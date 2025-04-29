import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from './Search';

describe('Search', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders the search input field with placeholder', () => {
    render(<Search onSearch={mockOnSearch} />);
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    expect(searchInput).toBeInTheDocument();
  });

  it('calls onSearch with the search term after a delay', () => {
    render(<Search onSearch={mockOnSearch} />);
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'Sri' } });

    // Wait for the debounce timeout
    jest.advanceTimersByTime(200);

    expect(mockOnSearch).toHaveBeenCalledWith('Sri');
  });

  it('does not call onSearch immediately on typing', () => {
    render(<Search onSearch={mockOnSearch} />);
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'S' } });
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('clears the timeout if the component unmounts', () => {
    const { unmount } = render(<Search onSearch={mockOnSearch} />);
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'Test' } });
    unmount();
    jest.advanceTimersByTime(200);
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('calls onSearch with an empty string when the input is cleared', () => {
    render(<Search onSearch={mockOnSearch} />);
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'Test' } });
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from './Filter';

describe('Filter', () => {
  const mockOnFilter = jest.fn();

  it('renders the filter select with default option', () => {
    render(<Filter onFilter={mockOnFilter} />);
    expect(screen.getByLabelText('Filter by region')).toBeInTheDocument();
    expect(screen.getByText('Filter by Region')).toBeInTheDocument();
  });

  it('renders all the region options', () => {
    const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    render(<Filter onFilter={mockOnFilter} />);
    regions.forEach(region => {
      expect(screen.getByText(region)).toBeInTheDocument();
    });
  });

  it('calls onFilter with the selected region on change', () => {
    render(<Filter onFilter={mockOnFilter} />);
    const select = screen.getByLabelText('Filter by region');
    fireEvent.change(select, { target: { value: 'Asia' } });
    expect(mockOnFilter).toHaveBeenCalledWith('Asia');
    expect(select.value).toBe('Asia');
  });

  it('calls onFilter with an empty string when the default option is selected', () => {
    render(<Filter onFilter={mockOnFilter} />);
    const select = screen.getByLabelText('Filter by region');
    fireEvent.change(select, { target: { value: '' } });
    expect(mockOnFilter).toHaveBeenCalledWith('');
    expect(select.value).toBe('');
  });
});
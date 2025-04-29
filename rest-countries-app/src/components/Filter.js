import { useState } from 'react';
import Form from 'react-bootstrap/Form';

export default function Filter({ onFilter }) {
  const [region, setRegion] = useState('');

  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const handleChange = (e) => {
    setRegion(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <Form.Select value={region} onChange={handleChange} aria-label="Filter by region">
      <option value="">Filter by Region</option>
      {regions.map(region => (
        <option key={region} value={region}>{region}</option>
      ))}
    </Form.Select>
  );
}
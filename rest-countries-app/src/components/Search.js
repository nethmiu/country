import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Auto-search after typing stops (debounce)
  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (searchTerm.trim() === '') {
      onSearch(''); // Clear results immediately when search is empty
      return;
    }

    //  search after 200ms of inactivity
    const timeout = setTimeout(() => {
      onSearch(searchTerm);
    }, 200);

    setTypingTimeout(timeout);

    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [searchTerm, onSearch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Form>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleChange}
          aria-label="Search for countries"
        />
        <InputGroup.Text>
          <i className="bi bi-search"></i>
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}
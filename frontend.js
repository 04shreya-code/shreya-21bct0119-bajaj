import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState([]);

  const validateJSON = (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateJSON(jsonInput)) {
      setError('Invalid JSON format');
      return;
    }
    setError('');
    
    try {
      const res = await fetch('YOUR_BACKEND_API_ENDPOINT/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonInput,
      });
      const data = await res.json();
      setResponse(data);
    } catch (e) {
      setError('Error fetching data');
    }
  };

  const renderResponse = () => {
    if (!response) return null;
    let filteredData = {};
    if (filter.includes('Alphabets')) {
      filteredData.alphabets = response.alphabets;
    }
    if (filter.includes('Numbers')) {
      filteredData.numbers = response.numbers;
    }
    if (filter.includes('Highest lowercase alphabet')) {
      filteredData.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }
    return (
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div>
      <h1>Your Roll Number</h1>
      <textarea 
        value={jsonInput} 
        onChange={(e) => setJsonInput(e.target.value)} 
        placeholder="Enter JSON here"
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {response && (
        <>
          <select multiple={true} onChange={(e) => setFilter([...e.target.selectedOptions].map(option => option.value))}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;

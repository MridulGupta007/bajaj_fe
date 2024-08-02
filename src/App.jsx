import React, { useState } from 'react';


function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonInputChange = (e) => {
    setJsonInput(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    try {
      // Validate JSON format
      const jsonData = JSON.parse(jsonInput);

      // Call the REST API
      const response = await fetch('https://bajaj-be.onrender.com/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData)
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setApiResponse(data);
      setSelectedOptions([]);
    } catch (error) {
      setErrorMessage('Invalid JSON or API request failed');
      setApiResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!apiResponse) return null;

    const responseToShow = {};

    if (selectedOptions.includes('Alphabets')) {
      responseToShow.Alphabets = apiResponse['alphabets'];
    }
    if (selectedOptions.includes('Numbers')) {
      responseToShow.Numbers = apiResponse['numbers'];
    }
    if (selectedOptions.includes('Highest Alphabet')) {
      responseToShow['Highest Alphabet'] = apiResponse['highest_alphabet'];
    }

    return (
      <pre>{JSON.stringify(responseToShow, null, 2)}</pre>
    );
  };

  return (
    <div className="flex flex-col">
      <h1 className='text-[20px] text-center'>Bajaj Finserv</h1>
      <div className='flex justify-center items-center gap-x-5'>
      <textarea
        value={jsonInput}
        onChange={handleJsonInputChange}
        placeholder="Enter valid JSON"
        rows="5"
        cols="50"
        className='border'
      />
      <button onClick={handleSubmit} className='bg-black text-white'>Submit</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
      {apiResponse && (
        <div className=''>
          <label>Select Response Options:</label>
          <select multiple onChange={handleOptionChange} className='border'>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest Alphabet">Highest Alphabet</option>
          </select>
          {/* <button onClick={renderResponse}>Show Response</button> */}
        </div>
      )}

      <div className='border'>
        {renderResponse()}
      </div>
    </div>
  );
}

export default App;

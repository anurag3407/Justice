import React from 'react'
import { useState } from 'react';

const Homepage = () => {
  const [caseNumber, setCaseNumber] = useState('');

  const handleInputChange = (event) => {
    setCaseNumber(event.target.value);
  };

  const handleSearch = () => {
    console.log(`Searching for case number: ${caseNumber}`);
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ fontFamily: 'Roboto, sans-serif', fontSize: '72px', fontWeight: 'semibold' }}>Track your court case status</h1>
      <p>Stay updated on your legal proceedings with real-time case details, hearing dates, and progress updates—right at your fingertips.</p>
      <input
        type="text"
        placeholder="Enter case number"
        value={caseNumber}
        onChange={handleInputChange}
        style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
      />
      <br />
      <button onClick={handleSearch} style={{ padding: '10px 20px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>
        Search Case Status
      </button>
      
    </div>
  );
};

export default Homepage;
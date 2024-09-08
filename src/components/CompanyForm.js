import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CompanyForm.css';

const CompanyForm = () => {
  const [url, setUrl] = useState('');

  const handleScrape = async () => {
    try {
      await axios.post('https://scrapping-backend-rtnu.onrender.com/api/companies/scrape', { url });
      alert('Website scraped successfully!');
      setUrl('');
    } catch (error) {
      alert('Failed to scrape website');
    }
  };

  return (
    <div className="company-form-container">
      <div className="input-section">
        <input
          type="text"
          className="input-field"
          placeholder="Enter domain name"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="fetch-btn" onClick={handleScrape}>
          Fetch & Save Details
        </button>
      </div>
    </div>
  );
};

export default CompanyForm;

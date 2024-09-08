
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CompanyDetails.css';

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      if (!id) {
        console.log('No ID available in the URL');
        return;
      }

      try {
        // const response = await axios.get(`http://localhost:5000/api/companies/${id}`);
        const response = await axios.get(`https://scrapping-backend-rtnu.onrender.com/api/companies/${id}`);
        setCompany(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch company details:', error);
        alert('Failed to fetch company details');
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!company) {
    return <div>No company data found.</div>;
  }

  return (
    <div className="company-details-container">
      <button className="back-btn" onClick={() => navigate('/')}>
        Home
      </button>

      <div className="company-overview">
        <img
          src={company.logo ? company.logo : '/icons/default-logo.svg'}
          alt={company.name}
          className="company-logo"
        />
        <div className="company-main-info">
          <h1>{company.name}</h1>
          <p>{company.description || 'No description available'}</p>
        </div>
        <div className="company-contact">
          {company.phoneNumber && <p><strong>Phone:</strong> {company.phoneNumber}</p>}
          {company.email && <p><strong>Email:</strong> {company.email}</p>}
        </div>
      </div>

      <div className="company-details-section">
        <div className="company-extra-info">
          <h3>Company Details</h3>
          <div className="company-info-item">
            <h4>Website:</h4>
            <p><a href={company.url} target="_blank" rel="noreferrer">{company.url}</a></p>
          </div>
          <div className="company-info-item">
            <h4>Description:</h4>
            <p>{company.description || 'No description available'}</p>
          </div>
          <div className="company-info-item">
            <h4>Email:</h4>
            <p>{company.email || 'No email available'}</p>
          </div>
          <div className="company-info-item">
            <h4>Social Profiles:</h4>
            <div className="social-icons">
              {company.facebookUrl && (
                <a href={company.facebookUrl} target="_blank" rel="noreferrer">
                  <img src="/icons/facebook.svg" alt="Facebook" />
                </a>
              )}
              {company.instagramUrl && (
                <a href={company.instagramUrl} target="_blank" rel="noreferrer">
                  <img src="/icons/instagram.svg" alt="Instagram" />
                </a>
              )}
              {company.twitterUrl && (
                <a href={company.twitterUrl} target="_blank" rel="noreferrer">
                  <img src="/icons/twitter.svg" alt="Twitter" />
                </a>
              )}
              {company.linkedinUrl && (
                <a href={company.linkedinUrl} target="_blank" rel="noreferrer">
                  <img src="/icons/linkedin.svg" alt="LinkedIn" />
                </a>
              )}
            </div>
          </div>
          <div className="company-info-item">
            <h4>Address:</h4>
            <p>{company.address || 'No address available'}</p>
          </div>
        </div>

        <div className="company-screenshot-section">
          <h3>Screenshot of Webpage</h3>
          {company.screenshot ? (
            <img
              src={`https://scrapping-backend-rtnu.onrender.com${company.screenshot}`}  // Load the relative screenshot URL
              alt="Website screenshot"
              className="company-screenshot"
            />
          ) : (
            <p>No screenshot available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;

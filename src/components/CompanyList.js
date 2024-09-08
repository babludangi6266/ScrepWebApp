
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';
import '../styles/CompanyList.css';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('https://scrapping-backend-rtnu.onrender.com/api/companies');
        setCompanies(response.data);
      } catch (error) {
        alert('Failed to fetch companies');
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanyClick = (companyId, companyUrl) => {
    navigate(`/companies/${companyId}`, { state: { companyUrl } });
  };

  const handleCheckboxChange = (companyId) => {
    setSelectedCompanies((prevSelected) =>
      prevSelected.includes(companyId)
        ? prevSelected.filter(id => id !== companyId)
        : [...prevSelected, companyId]
    );
  };

  const handleDelete = async () => {
    try {
      await axios.post('https://scrapping-backend-rtnu.onrender.com/api/companies/delete-batch', { ids: selectedCompanies });
      alert('Companies deleted successfully');
      setCompanies(companies.filter(company => !selectedCompanies.includes(company._id)));
      setSelectedCompanies([]);
    } catch (error) {
      alert('Failed to delete companies');
    }
  };

  const handleExport = () => {
    const csvData = companies
      .filter((company) => selectedCompanies.includes(company._id))
      .map((company) => ({
        Name: company.name,
        Description: company.description,
        Address: company.address,
        Phone: company.phone,
        Email: company.email,
      }));

    const csvRows = [
      ["Name", "Description", "Address", "Phone", "Email"],
      ...csvData.map((row) => [
        row.Name,
        row.Description,
        row.Address,
        row.Phone,
        row.Email
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8,"
      + csvRows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "companies.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="company-list-section">
      <div className="action-buttons">
        <button className="delete-btn" onClick={handleDelete} disabled={selectedCompanies.length === 0}>
          Delete
        </button>
        <button className="export-btn" onClick={handleExport} disabled={selectedCompanies.length === 0}>
          Export as CSV
        </button>
      </div>

      <table className="company-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Company</th>
            <th>Social Profiles</th>
            <th>Description</th>
            <th>Address</th>
            <th>Phone No</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedCompanies.includes(company._id)}
                  onChange={() => handleCheckboxChange(company._id)}
                />
              </td>
              <td>
                <span
                  className="company-name"
                  onClick={() => handleCompanyClick(company._id, company.url)} // Pass company URL here
                >
                  <img src={`/${company.logo}`} alt={company.name} className="company-icon" />
                  {company.name}
                </span>
              </td>
              <td>
                <div className="social-icons">
                  <a href={`https://twitter.com/${company.twitterUrl}`} target="_blank" rel="noreferrer">
                    <FaTwitter className="social-icon" />
                  </a>
                  <a href={`https://linkedin.com/${company.linkedinUrl}`} target="_blank" rel="noreferrer">
                    <FaLinkedin className="social-icon" />
                  </a>
                  <a href={`https://facebook.com/${company.facebookUrl}`} target="_blank" rel="noreferrer">
                    <FaFacebook className="social-icon" />
                  </a>
                </div>
              </td>
              <td>{company.description}</td>
              <td>{company.address}</td>
              <td>{company.phoneNumber}</td>
              <td>{company.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;

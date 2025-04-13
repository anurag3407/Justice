import React, { useState, useEffect } from 'react';
import { fetchAdvocates } from '../services/advocateService';
import './AdvocatesList.css';

const AdvocatesList = () => {
  const [advocates, setAdvocates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAdvocates = async () => {
      try {
        setLoading(true);
        const data = await fetchAdvocates();
        setAdvocates(data);
        setError(null);
      } catch (err) {
        setError('Failed to load advocates. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getAdvocates();
  }, []);

  if (loading) return <div className="loading">Loading advocates...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="advocates-container">
      <h2>Legal Advocates</h2>
      <div className="advocates-grid">
        {advocates.map(advocate => (
          <div key={advocate._id} className="advocate-card">
            <div className="advocate-header">
              <img src={advocate.image} alt={advocate.name} className="advocate-image" />
              <h3>{advocate.name}</h3>
              <p className="specialization">{advocate.specialization}</p>
            </div>
            <div className="advocate-body">
              <p><strong>Experience:</strong> {advocate.experience}</p>
              <p><strong>Fees:</strong> {advocate.fees}</p>
              <p><strong>Rating:</strong> {advocate.rating} ★</p>
              <p><strong>Contact:</strong> {advocate.contact.phone}</p>
              <p><strong>Email:</strong> {advocate.contact.email}</p>
              <p><strong>Address:</strong> {advocate.contact.address}</p>
              <p className="bio">{advocate.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvocatesList; 
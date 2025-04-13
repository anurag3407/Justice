import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = ({ caseData }) => {
  if (!caseData) return null;

  // Function to get status color
  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    const statusLower = status.toLowerCase();
    if (statusLower.includes('hearing')) return 'bg-blue-100 text-blue-800';
    if (statusLower.includes('reserved') || statusLower.includes('judgment')) return 'bg-purple-100 text-purple-800';
    if (statusLower.includes('mediation') || statusLower.includes('progress') || statusLower.includes('settlement')) 
      return 'bg-yellow-100 text-yellow-800';
    if (statusLower.includes('closed') || statusLower.includes('resolved')) return 'bg-green-100 text-green-800';
    
    return 'bg-gray-100 text-gray-800';
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }).format(date);
    } catch (error) {
      // If it's already formatted or can't be parsed, return as is
      return dateString;
    }
  };

  return (
    <div className="search-results-wrapper">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#262626]">Case Details</h2>
      </div>

      <div className="case-card">
        <div className="case-header">
          <div className="flex flex-wrap justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-[#262626]">{caseData.title}</h3>
              <p className="text-gray-600 mt-1">Case #{caseData.caseNumber}</p>
            </div>
            <div className={`status-tag ${getStatusColor(caseData.status)}`}>
              {caseData.status}
            </div>
          </div>
          
          <p className="mt-2 text-gray-700">{caseData.description}</p>
          
          <div className="case-info-grid">
            <div>
              <p className="info-row"><span className="info-label">Court:</span> {caseData.court}</p>
              <p className="info-row"><span className="info-label">Filing Date:</span> {formatDate(caseData.filingDate)}</p>
              <p className="info-row"><span className="info-label">Judge:</span> {caseData.judge}</p>
            </div>
            
            <div>
              <p className="info-row"><span className="info-label">Plaintiff:</span> {caseData.plaintiff}</p>
              <p className="info-row"><span className="info-label">Defendant:</span> {caseData.defendant}</p>
              <p className="info-row"><span className="info-label">Next Hearing:</span> {formatDate(caseData.nextHearingDate)}</p>
            </div>
          </div>
        </div>
        
        <div className="case-timeline">
          <h3 className="text-lg font-semibold mb-4">Case Timeline</h3>
          
          <div className="timeline-container">
            {caseData.updates && caseData.updates.map((update, index) => (
              <div key={index} className="timeline-item">
                <div className={`timeline-marker ${index === 0 ? 'active' : ''}`}></div>
                <div className="timeline-content">
                  <p className="timeline-date">{formatDate(update.date)}</p>
                  <p className="timeline-description">{update.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="actions-container">
        <Link 
          to="/advocates" 
          className="advocate-button"
        >
          Find an Advocate
        </Link>
      </div>
    </div>
  );
};

export default SearchResults; 
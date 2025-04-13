import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CaseSearch = () => {
  const [caseNumber, setCaseNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!caseNumber.trim()) {
      setError('Please enter a case number');
      return;
    }
    
    // Navigate to results page with case number as query param and state
    navigate(`/case-result?caseNumber=${encodeURIComponent(caseNumber)}`, { 
      state: { caseNumber } 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Enter your case number (e.g., CIV-2023-001)"
              value={caseNumber}
              onChange={(e) => {
                setCaseNumber(e.target.value);
                if (error) setError('');
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CB69F]"
            />
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#4CB69F] hover:bg-[#3da68f] text-white rounded-lg font-medium transition-all duration-200 shadow hover:shadow-lg hover:translate-y-[-2px] md:flex-shrink-0"
          >
            Track Case
          </button>
        </div>
      </form>
      <div className="mt-4 text-sm text-gray-500 text-center">
        <p>Try sample case numbers: CIV-2023-001, CRIM-2023-042, or FAM-2023-103</p>
      </div>
    </div>
  );
};

export default CaseSearch; 
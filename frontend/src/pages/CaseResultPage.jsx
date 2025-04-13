import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SearchResults from '../components/SearchResults';
import caseService from '../api/caseService';

const CaseResultPage = () => {
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get case number from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const caseNumber = queryParams.get('caseNumber');
  
  useEffect(() => {
    const fetchCaseData = async () => {
      try {
        if (!caseNumber) {
          setError('No case number provided');
          setLoading(false);
          return;
        }
        
        setLoading(true);
        
        try {
          // Try to fetch from the API using our service
          const data = await caseService.getCaseByNumber(caseNumber);
          setCaseData(data);
        } catch (err) {
          console.error('Error fetching case data:', err);
          setError('Case not found. Please check the case number and try again.');
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load case data');
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchCaseData();
  }, [caseNumber]);

  // Function to get status color
  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    const statusLower = status.toLowerCase();
    if (statusLower.includes('hearing')) return 'bg-blue-100 text-blue-800';
    if (statusLower.includes('reserved') || statusLower.includes('judgment')) return 'bg-purple-100 text-purple-800';
    if (statusLower.includes('mediation') || statusLower.includes('progress') || statusLower.includes('settlement')) return 'bg-yellow-100 text-yellow-800';
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

  if (loading) {
    return (
      <Layout>
        <div className="bg-gradient-to-b from-white to-gray-50 py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#4CB69F]"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-gradient-to-b from-white to-gray-50 py-12">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-xl font-semibold text-[#262626] mb-4">{error}</h2>
              <button 
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-[#4CB69F] hover:bg-[#3da68f] text-white rounded-lg font-medium transition-all duration-200 shadow hover:shadow-lg hover:translate-y-[-2px]"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <button 
                onClick={() => navigate(-1)} 
                className="flex items-center text-[#4CB69F] hover:text-[#3da68f] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <h1 className="text-3xl font-bold text-[#262626] ml-auto mr-auto">Case Details</h1>
              <div className="invisible">Back</div> {/* For centering the heading */}
            </div>
            
            {caseData && <SearchResults caseData={caseData} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CaseResultPage; 
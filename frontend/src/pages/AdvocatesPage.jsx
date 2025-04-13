import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { fetchAdvocates } from '../services/advocateService';

const AdvocatesPage = () => {
  const [advocates, setAdvocates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAdvocates = async () => {
      try {
        setLoading(true);
        const data = await fetchAdvocates();
        setAdvocates(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching advocates:', err);
        setError('Failed to load advocates. Please try again later.');
        setLoading(false);
      }
    };

    getAdvocates();
  }, []);

  // Render star rating based on rating value
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < Math.floor(rating) ? "text-[#4CB69F]" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-[#262626]">Find Legal Advocates</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Connect with experienced legal professionals specializing in various areas of law to help with your legal matters.
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#4CB69F]"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-[#BD8C7D] text-[#BD8C7D] px-6 py-4 rounded-lg max-w-2xl mx-auto">
              <p className="font-medium">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {advocates.map((advocate) => (
                <div 
                  key={advocate._id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="md:w-1/3 relative overflow-hidden">
                    <img 
                      src={advocate.image} 
                      alt={advocate.name} 
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 md:opacity-0 md:group-hover:opacity-80 transition-opacity"></div>
                  </div>
                  
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h2 className="text-xl font-bold text-[#262626] mb-1">
                            {advocate.name}
                          </h2>
                          <p className="text-[#BD8C7D] font-medium italic">
                            {advocate.specialization}
                          </p>
                        </div>
                        <div className="flex items-center bg-[#F5F5F5] px-3 py-1 rounded-full">
                          {renderStars(advocate.rating)}
                          <span className="ml-1 font-medium">{advocate.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4CB69F] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <p className="text-gray-700">
                            <span className="font-medium">Experience:</span> {advocate.experience}
                          </p>
                        </div>
                        
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4CB69F] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <p className="text-gray-700">
                            {advocate.contact.phone}
                          </p>
                        </div>
                        
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4CB69F] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span className="inline-block bg-[#262626] text-[#F5F5F5] px-3 py-1 rounded-full text-sm font-medium">
                            {advocate.fees}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm mb-5">
                        {advocate.description}
                      </p>
                    </div>

                    <div className="flex space-x-4">
                      <button 
                        className="flex-1 bg-[#262626] hover:bg-opacity-80 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow hover:shadow-md flex justify-center items-center"
                        onClick={() => alert(`Booking consultation with ${advocate.name}`)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Book Consultation
                      </button>
                      <button 
                        className="px-4 py-3 border border-[#4CB69F] text-[#4CB69F] hover:bg-[#4CB69F] hover:text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
                        onClick={() => alert(`View profile for ${advocate.name}`)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdvocatesPage; 
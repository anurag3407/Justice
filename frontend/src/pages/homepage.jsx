import Layout from '../components/Layout';
import CaseSearch from '../components/CaseSearch';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-12 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#262626]">
              Navigate the Justice System with Confidence
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Track your case, find legal representation, and understand complex legal terms—all in one place.
            </p>
            
            <CaseSearch />
          </div>
        </div>
        
        {/* Features Section */}
        <div className="bg-[#262626] py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">How JusticeTrack Helps You</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#333333] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-[#4CB69F]/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#4CB69F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Track Your Case</h3>
                <p className="text-gray-300 mb-4">
                  Monitor your case status in real-time with updates on hearings, judgments, and filings.
                </p>
                <Link to="/case-result?caseNumber=CIV-2023-001" className="text-[#4CB69F] hover:text-[#3da68f] font-medium flex items-center">
                  Try it now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              <div className="bg-[#333333] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-[#4CB69F]/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#4CB69F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Find Legal Advocates</h3>
                <p className="text-gray-300 mb-4">
                  Connect with qualified legal professionals specialized in your type of case.
                </p>
                <Link to="/advocates" className="text-[#4CB69F] hover:text-[#3da68f] font-medium flex items-center">
                  Find an advocate
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              <div className="bg-[#333333] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-[#4CB69F]/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#4CB69F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Simplify Legal Documents</h3>
                <p className="text-gray-300 mb-4">
                  Use our AI-powered tool to summarize and understand complex legal documents.
                </p>
                <Link to="/case-summarizer" className="text-[#4CB69F] hover:text-[#3da68f] font-medium flex items-center">
                  Summarize now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Glossary Promo Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-1 p-8">
                  <h2 className="text-2xl font-bold text-[#262626] mb-4">Legal Glossary</h2>
                  <p className="text-gray-600 mb-6">
                    Don't get lost in legal jargon. Our comprehensive glossary explains over 30 common legal terms in plain language.
                  </p>
                  <Link 
                    to="/glossary" 
                    className="inline-block px-6 py-3 bg-[#262626] hover:bg-[#333333] text-white rounded-lg font-medium transition-all duration-200 shadow hover:shadow-lg"
                  >
                    Explore the Glossary
                  </Link>
                </div>
                <div className="md:flex-1 bg-[#4CB69F]/10 p-8">
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-[#262626]">Bail</h3>
                      <p className="text-sm text-gray-600">A security required for temporary release from custody while awaiting trial.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-[#262626]">Hearing</h3>
                      <p className="text-sm text-gray-600">A proceeding where evidence and arguments are presented to resolve a dispute.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-[#262626]">Plaintiff</h3>
                      <p className="text-sm text-gray-600">The party who initiates a lawsuit claiming legal remedy for damages or injury.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage; 
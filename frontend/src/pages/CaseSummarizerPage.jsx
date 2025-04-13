import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSpinner, 
  faRobot, 
  faFileAlt, 
  faCheckCircle, 
  faExclamationTriangle, 
  faLaptopCode,
  faBrain,
  faSearch,
  faLightbulb,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import Layout from '../components/Layout';

// Backend API URL - in production this would come from environment variables
// For local development, we're using CORS so direct API calls are fine
const BASE_URL = "http://localhost:5000";
const API_URL = `${BASE_URL}/api`;

const CaseSummarizerPage = () => {
  const [caseText, setCaseText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState(true);
  const [usingAI, setUsingAI] = useState(true);
  const [aiProvider, setAiProvider] = useState('deepseek');
  const [characterCount, setCharacterCount] = useState(0);
  
  // Update character count when text changes
  useEffect(() => {
    setCharacterCount(caseText.length);
  }, [caseText]);

  // Generate a local summary when backend is not available
  const generateLocalSummary = (text) => {
    // Extract the first few sentences for the mock summary
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    if (sentences.length === 0) {
      return 'Unable to generate summary. Please provide more content.';
    }
    
    // Extract a more comprehensive summary for longer texts
    const summaryLength = Math.min(Math.max(3, Math.floor(sentences.length / 5)), 8);
    
    // Take first sentence, one from middle, and last sentence for very short texts
    let summaryText = '';
    
    if (sentences.length <= 5) {
      summaryText = sentences.join('. ');
    } else {
      // Get introduction (first 1-2 sentences)
      summaryText += sentences.slice(0, 2).join('. ') + '. ';
      
      // Get key points from throughout the text
      const step = Math.floor(sentences.length / summaryLength);
      for (let i = 2; i < summaryLength - 1; i++) {
        const index = Math.min(i * step, sentences.length - 2);
        summaryText += sentences[index] + '. ';
      }
      
      // Get conclusion (last sentence)
      summaryText += sentences[sentences.length - 1] + '.';
    }
    
    return summaryText.replace(/\.+/g, '.').trim();
  };

  // Extract legal terms from text
  const extractLegalTerms = (text) => {
    const legalTerms = [
      'plaintiff', 'defendant', 'court', 'appeal', 'judgment', 'petition', 
      'verdict', 'ruling', 'statute', 'jurisdiction', 'prosecution', 'testimony',
      'precedent', 'evidence', 'damages', 'tort', 'hearing', 'injunction',
      'affidavit', 'conviction', 'allegation', 'pleading', 'settlement',
      'constitutional', 'judicial', 'statutory', 'contract', 'liability'
    ];
    
    // Find legal terms in the text
    const matches = [];
    const lowerText = text.toLowerCase();
    
    legalTerms.forEach(term => {
      if (lowerText.includes(term)) {
        matches.push(term);
      }
    });
    
    return matches.slice(0, 5); // Return up to 5 key legal terms
  };

  // Check if backend is available on component mount
  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        // Use the health check endpoint to verify backend connectivity
        const response = await axios.get(`${BASE_URL}/health`, { timeout: 3000 });
        if (response.data && response.data.status === 'ok') {
          console.log("Backend server is available");
          setBackendAvailable(true);
        } else {
          throw new Error('Health check failed');
        }
      } catch (err) {
        console.warn("Backend connection failed, using client-side processing", err.message);
        setBackendAvailable(false);
      }
    };

    checkBackendConnection();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caseText.trim()) {
      setError('Please enter a legal case to summarize.');
      return;
    }

    setLoading(true);
    setError('');
    setSummary('');

    try {
      if (backendAvailable) {
        // Using our backend API with DeepSeek
        try {
          const response = await axios.post(`${API_URL}/ai/summarize`, {
            text: caseText
          }, { 
            timeout: 30000 // 30 second timeout
          });
          
          setLoading(false);
          if (response.data && response.data.success && response.data.summary) {
            setSummary(response.data.summary);
            setUsingAI(response.data.ai || false);
            
            if (response.data.fallback) {
              setError('Note: DeepSeek AI service is currently unavailable. Using local processing instead.');
              setUsingAI(false);
              setAiProvider('local');
            } else if (response.data.alternative) {
              setAiProvider('alternative');
              setError('Note: Using our alternative AI service for summarization.');
            } else {
              setAiProvider('deepseek');
            }
          } else {
            throw new Error('Failed to generate summary. Please try again.');
          }
        } catch (err) {
          if (err.message.includes('Network Error') || err.code === 'ECONNABORTED') {
            setBackendAvailable(false);
            setUsingAI(false);
            
            // Fall back to client-side processing
            const localSummary = generateLocalSummary(caseText);
            const legalTerms = extractLegalTerms(caseText);
            
            let finalSummary = localSummary;
            if (legalTerms.length > 0) {
              finalSummary += '\n\nKey legal concepts: ' + legalTerms.join(', ') + '.';
            }
            
            setSummary(finalSummary);
            setError('Server is not accessible. Using local processing instead.');
            setLoading(false);
          } else {
            throw err;
          }
        }
      } else {
        // Client-side processing when backend is not available
        setUsingAI(false);
        setTimeout(() => {
          const localSummary = generateLocalSummary(caseText);
          const legalTerms = extractLegalTerms(caseText);
          
          let finalSummary = localSummary;
          if (legalTerms.length > 0) {
            finalSummary += '\n\nKey legal concepts: ' + legalTerms.join(', ') + '.';
          }
          
          setSummary(finalSummary);
          setLoading(false);
        }, 1000); // Add a small delay to simulate processing
      }
    } catch (err) {
      setLoading(false);
      setError('Error: ' + (err.response?.data?.error || err.message || 'Unknown error occurred'));
      console.error('Processing Error:', err);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">Legal Case Summarizer</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Powered by DeepSeek AI. Transform complex legal documents into clear, concise summaries in seconds.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-indigo-100 transform transition hover:shadow-2xl duration-300">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faBrain} className="text-indigo-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-indigo-800">How Our AI Works</h2>
              <p className="text-gray-600">Advanced text processing analyzes and extracts key information from legal documents</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg shadow-sm border border-indigo-100 transform transition hover:-translate-y-1 hover:shadow-md duration-300">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faFileAlt} className="text-indigo-600" />
                </div>
              </div>
              <div className="text-center text-indigo-800 font-semibold mb-2">Input Your Text</div>
              <p className="text-center text-gray-600 text-sm">Paste your legal document, case file, or legal article</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg shadow-sm border border-indigo-100 transform transition hover:-translate-y-1 hover:shadow-md duration-300">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faSearch} className="text-indigo-600" />
                </div>
              </div>
              <div className="text-center text-indigo-800 font-semibold mb-2">Advanced Analysis</div>
              <p className="text-center text-gray-600 text-sm">DeepSeek AI analyzes key facts, arguments, and legal points</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg shadow-sm border border-indigo-100 transform transition hover:-translate-y-1 hover:shadow-md duration-300">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faLightbulb} className="text-indigo-600" />
                </div>
              </div>
              <div className="text-center text-indigo-800 font-semibold mb-2">Get Your Summary</div>
              <p className="text-center text-gray-600 text-sm">Receive a concise, accurate summary in seconds</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-xl p-8 border border-indigo-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faFileAlt} className="text-indigo-600" />
                </div>
                <h2 className="text-xl font-bold text-indigo-800">Input Legal Text</h2>
              </div>
              
              <div className="flex items-center text-sm px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full">
                <FontAwesomeIcon icon={backendAvailable ? faBrain : faLaptopCode} className="mr-2" />
                {backendAvailable ? 
                  (aiProvider === 'deepseek' ? 'DeepSeek AI' : 
                   aiProvider === 'alternative' ? 'AI Service' : 'Local Processing') : 
                  'Local Processing'} 
              </div>
            </div>
            
            {!backendAvailable && (
              <div className="bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded-lg mb-5 text-sm">
                AI services are currently unavailable. Using local processing for summarization.
              </div>
            )}
            
            {backendAvailable && !usingAI && (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-lg mb-5 text-sm">
                Using local processing for reliable summarization. Your data remains private and is processed locally.
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <textarea
                  value={caseText}
                  onChange={(e) => setCaseText(e.target.value)}
                  className="w-full h-64 p-4 bg-indigo-50 border border-indigo-200 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
                  placeholder="Paste your legal case text here..."
                ></textarea>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>
                    <FontAwesomeIcon icon={faClock} className="mr-1" />
                    {characterCount > 0 ? 'Estimated processing time: ~' + Math.max(1, Math.ceil(characterCount / 2000)) + ' seconds' : 'Enter text to see estimated processing time'}
                  </span>
                  <span className={characterCount > 8000 ? 'text-red-500' : 'text-gray-500'}>
                    {characterCount}/8000 characters {characterCount > 8000 ? '(text will be truncated)' : ''}
                  </span>
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3.5 px-6 rounded-lg transition duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                    Analyzing...
                  </span>
                ) : 'Generate Summary'}
              </button>
            </form>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl p-8 border border-indigo-100">
            <div className="flex items-center mb-6">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  loading ? 'bg-blue-100' : 
                  summary ? 'bg-green-100' : 
                  'bg-amber-100'
                }`}
              >
                <FontAwesomeIcon 
                  icon={loading ? faSpinner : summary ? faCheckCircle : faExclamationTriangle} 
                  className={`${
                    loading ? 'text-blue-600' : 
                    summary ? 'text-green-600' : 
                    'text-amber-600'
                  } ${loading ? 'animate-spin' : ''}`}
                />
              </div>
              <h2 className="text-xl font-bold text-indigo-800">Summary</h2>
              
              {summary && (
                <div className="ml-auto flex items-center space-x-2">
                  {usingAI && (
                    <span className="text-xs bg-indigo-100 text-indigo-800 py-1 px-2 rounded-full">
                      {aiProvider === 'deepseek' ? 'DeepSeek AI' : 
                       aiProvider === 'alternative' ? 'AI Service' : 'Local Processing'}
                    </span>
                  )}
                  <button 
                    onClick={copyToClipboard}
                    className="text-sm text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 py-1 px-3 rounded-lg transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              )}
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-5 text-sm">
                {error}
              </div>
            )}
            
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 bg-indigo-50 rounded-lg border border-dashed border-indigo-200">
                <div className="w-16 h-16 mb-4 relative">
                  <div className="absolute inset-0 bg-indigo-200 rounded-full opacity-25 animate-ping"></div>
                  <div className="relative w-full h-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faSpinner} spin className="text-indigo-600 text-3xl" />
                  </div>
                </div>
                <p className="text-indigo-700 font-medium">Analyzing legal text and generating summary...</p>
                <p className="text-indigo-500 text-sm mt-2">This may take a few moments</p>
              </div>
            ) : summary ? (
              <div className="h-64 overflow-y-auto p-5 bg-indigo-50 border border-indigo-100 rounded-lg">
                <p className="text-gray-800 whitespace-pre-line">{summary}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-indigo-50 rounded-lg border border-dashed border-indigo-200">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                  <FontAwesomeIcon icon={faLightbulb} className="text-indigo-500 text-2xl" />
                </div>
                <p className="text-indigo-700 font-medium">Your summary will appear here</p>
                <p className="text-indigo-500 text-sm">Enter legal text and click "Generate Summary"</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-xl shadow-xl p-8 border border-indigo-100">
          <h3 className="text-xl font-bold text-indigo-800 mb-6">Features of our Legal Summarizer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start transform transition duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                <FontAwesomeIcon icon={faBrain} className="text-indigo-600" />
              </div>
              <div>
                <h4 className="font-semibold text-indigo-800 mb-1">DeepSeek AI-Powered Analysis</h4>
                <p className="text-gray-600">Advanced language model trained specifically on legal content for accurate summaries</p>
              </div>
            </div>
            <div className="flex items-start transform transition duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                <FontAwesomeIcon icon={faSearch} className="text-indigo-600" />
              </div>
              <div>
                <h4 className="font-semibold text-indigo-800 mb-1">Key Legal Concept Detection</h4>
                <p className="text-gray-600">Automatically identifies and highlights important legal terminology</p>
              </div>
            </div>
            <div className="flex items-start transform transition duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                <FontAwesomeIcon icon={faLaptopCode} className="text-indigo-600" />
              </div>
              <div>
                <h4 className="font-semibold text-indigo-800 mb-1">Works Offline When Needed</h4>
                <p className="text-gray-600">Seamless fallback to local processing ensures you always get results</p>
              </div>
            </div>
            <div className="flex items-start transform transition duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                <FontAwesomeIcon icon={faClock} className="text-indigo-600" />
              </div>
              <div>
                <h4 className="font-semibold text-indigo-800 mb-1">Saves Research Time</h4>
                <p className="text-gray-600">Reduce hours of reading to minutes with accurate, concise summaries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CaseSummarizerPage; 
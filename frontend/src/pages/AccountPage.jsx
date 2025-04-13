import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../components/Header';

const AccountPage = () => {
  // State for login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Get authentication context
  const { isLoggedIn, user, login, logout } = useAuth();

  // Mock login function
  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, this would make an API call
    if (email && password) {
      login({
        name: 'Jamie Smith',
        email: email,
        avatarUrl: 'https://randomuser.me/api/portraits/women/42.jpg',
        accountType: 'Standard',
        joinDate: 'January 2023',
        caseHistory: [
          {
            id: 'CNR1234567',
            title: 'Smith vs. City Housing Authority',
            court: 'District Court of Delhi',
            status: 'Active',
            lastUpdated: '2023-12-15',
            nextHearing: '2024-05-20',
            type: 'Civil',
            description: 'Dispute regarding tenant rights and apartment maintenance issues.',
            filingDate: '2023-08-10',
            documents: ['Complaint', 'Response', 'Motion to Dismiss'],
            parties: {
              plaintiff: 'Jamie Smith',
              defendant: 'City Housing Authority'
            }
          },
          {
            id: 'CNR7654321',
            title: 'Public Prosecutor vs. J. Smith',
            court: 'Metropolitan Magistrate Court',
            status: 'Resolved',
            lastUpdated: '2023-10-05',
            resolution: 'Charges Dropped',
            type: 'Criminal',
            description: 'Traffic violation case regarding illegal parking. Charges dropped after evidence review.',
            filingDate: '2023-05-22',
            documents: ['Charge Sheet', 'Defense Statement', 'Dismissal Order'],
            parties: {
              plaintiff: 'Public Prosecutor',
              defendant: 'Jamie Smith'
            }
          },
          {
            id: 'CNR9876543',
            title: 'Smith vs. ABC Insurance Co.',
            court: 'Consumer Disputes Redressal Forum',
            status: 'Pending',
            lastUpdated: '2024-03-18',
            nextHearing: '2024-06-12',
            type: 'Consumer',
            description: 'Insurance claim dispute regarding health insurance policy coverage.',
            filingDate: '2024-01-25',
            documents: ['Complaint', 'Insurance Policy', 'Medical Records'],
            parties: {
              plaintiff: 'Jamie Smith',
              defendant: 'ABC Insurance Co.'
            }
          }
        ]
      });
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setEmail('');
    setPassword('');
  };

  // Status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Active':
        return 'bg-blue-100 text-blue-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-4">
          {!isLoggedIn ? (
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
              <h1 className="text-3xl font-bold mb-6 text-[#262626] text-center">Login to Your Account</h1>
              
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CB69F] focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CB69F] focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#4CB69F] focus:ring-[#4CB69F] border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-[#4CB69F] hover:text-[#3da68f]">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-[#4CB69F] hover:bg-[#3da68f] text-white p-3 rounded-lg font-medium transition-all duration-200 shadow hover:shadow-lg hover:translate-y-[-2px]"
                >
                  Sign In
                </button>
                <div className="text-center mt-6">
                  <p className="text-gray-600">
                    Don't have an account? <span className="text-[#4CB69F] hover:text-[#3da68f] cursor-pointer font-medium">Create Account</span>
                  </p>
                </div>
              </form>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#4CB69F] shadow-md flex-shrink-0">
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h1 className="text-3xl font-bold text-[#262626] mb-2">{user.name}</h1>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <p className="text-gray-600">{user.email}</p>
                      <span className="sm:before:content-['•'] sm:before:mx-2 sm:before:text-gray-300 hidden sm:inline"></span>
                      <p className="text-gray-600">Member since {user.joinDate}</p>
                      <span className="sm:before:content-['•'] sm:before:mx-2 sm:before:text-gray-300 hidden sm:inline"></span>
                      <p className="text-gray-600">Account: <span className="font-medium">{user.accountType}</span></p>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 shadow hover:shadow-lg hover:translate-y-[-2px] self-start"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#262626]">Case History</h2>
                  <div className="text-sm font-medium text-gray-500">
                    Showing {user.caseHistory?.length || 0} cases
                  </div>
                </div>
                
                {user.caseHistory && user.caseHistory.length > 0 ? (
                  <div className="space-y-6">
                    {user.caseHistory.map((caseItem) => (
                      <div key={caseItem.id} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
                        <div className="p-6">
                          <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                            <h3 className="text-xl font-semibold text-[#262626]">{caseItem.title}</h3>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(caseItem.status)}`}>
                              {caseItem.status}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Case ID</p>
                              <p className="font-medium">{caseItem.id}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Court</p>
                              <p className="font-medium">{caseItem.court}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Case Type</p>
                              <p className="font-medium">{caseItem.type}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Filing Date</p>
                              <p className="font-medium">{caseItem.filingDate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                              <p className="font-medium">{caseItem.lastUpdated}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 mb-1">
                                {caseItem.status === 'Resolved' ? 'Resolution' : 'Next Hearing'}
                              </p>
                              <p className="font-medium">
                                {caseItem.status === 'Resolved' ? caseItem.resolution : caseItem.nextHearing}
                              </p>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-1">Description</p>
                            <p className="text-gray-700">{caseItem.description}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-3">
                            <Link 
                              to={`/case-result?caseNumber=${caseItem.id}`}
                              className="px-4 py-2 bg-[#4CB69F] hover:bg-[#3da68f] text-white rounded-lg text-sm font-medium transition-all duration-200"
                            >
                              View Full Details
                            </Link>
                            <button className="px-4 py-2 bg-[#F5F5F5] hover:bg-gray-200 text-[#262626] rounded-lg text-sm font-medium transition-all duration-200">
                              Download Documents
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 px-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-xl font-medium text-gray-500 mb-2">No cases found</p>
                    <p className="text-gray-400">You don't have any case history yet</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AccountPage; 
import apiClient from './client';

const getCases = async () => {
  const response = await apiClient.get('/cases');
  return response.data;
};

const getCaseById = async (id) => {
  const response = await apiClient.get(`/cases/${id}`);
  return response.data;
};

const getCaseByCaseNumber = async (caseNumber) => {
  const response = await apiClient.get(`/cases/number/${caseNumber}`);
  return response.data;
};

// Mock API service for case data
// This simulates data that would normally come from the backend API

// Sample case data from backend/seeder.js
const casesData = [
  {
    caseNumber: "CIV-2023-001",
    court: "Supreme Court",
    title: "Johnson vs. Smith Corporation",
    description: "Civil dispute regarding breach of contract in construction services",
    status: "Case in Hearing",
    nextHearingDate: "2023-08-15",
    judge: "Hon. Maria Rodriguez",
    plaintiff: "Robert Johnson",
    defendant: "Smith Corporation",
    filingDate: "2023-01-10",
    updates: [
      { date: "2023-01-10", description: "Case filed" },
      { date: "2023-03-05", description: "Initial hearing conducted" },
      { date: "2023-05-20", description: "Evidence submission completed" },
      { date: "2023-07-12", description: "Arguments heard" }
    ]
  },
  {
    caseNumber: "CRIM-2023-042",
    court: "District Court",
    title: "State vs. James Wilson",
    description: "Criminal case regarding alleged fraud and misappropriation of funds",
    status: "Judgment Reserved",
    nextHearingDate: "2023-09-08",
    judge: "Hon. Robert Chen",
    plaintiff: "State Prosecution",
    defendant: "James Wilson",
    filingDate: "2023-02-18",
    updates: [
      { date: "2023-02-18", description: "Case registered" },
      { date: "2023-04-22", description: "Charges framed" },
      { date: "2023-06-15", description: "Witness testimonies recorded" }
    ]
  },
  {
    caseNumber: "FAM-2023-103",
    court: "Family Court",
    title: "Thompson Divorce Settlement",
    description: "Divorce proceedings and child custody determination",
    status: "Mediation in Progress",
    nextHearingDate: "2023-08-28",
    judge: "Hon. Sarah Parker",
    plaintiff: "Emily Thompson",
    defendant: "Michael Thompson",
    filingDate: "2023-03-21",
    updates: [
      { date: "2023-03-21", description: "Petition filed" },
      { date: "2023-05-10", description: "Responses submitted" },
      { date: "2023-07-05", description: "First mediation session" }
    ]
  },
  {
    caseNumber: "DL01MH01234_2023",
    court: "Family Court",
    title: "Kumar Marriage Dispute",
    description: "Divorce and settlement case",
    status: "Settlement in progress",
    nextHearingDate: "2024-05-25",
    judge: "Hon. Ramesh Swaroop",
    plaintiff: "Satish Kumar",
    defendant: "Rupam Kumari",
    filingDate: "2024-03-02",
    updates: [
      { date: "2024-03-02", description: "Case Filed" },
      { date: "2024-04-10", description: "Mediation Started" }
    ]
  }
];

// Case service functions that simulate API calls
const caseService = {
  // Get all cases
  getCases: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(casesData);
      }, 500); // Simulate network delay
    });
  },

  // Get case by case number
  getCaseByNumber: async (caseNumber) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const caseData = casesData.find(
          (c) => c.caseNumber.toLowerCase() === caseNumber.toLowerCase()
        );
        
        if (caseData) {
          resolve(caseData);
        } else {
          reject(new Error("Case not found"));
        }
      }, 500);
    });
  },

  // Search cases by various parameters
  searchCases: async (searchParams) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredCases = [...casesData];
        
        if (searchParams.title) {
          filteredCases = filteredCases.filter(c => 
            c.title.toLowerCase().includes(searchParams.title.toLowerCase())
          );
        }
        
        if (searchParams.court) {
          filteredCases = filteredCases.filter(c => 
            c.court.toLowerCase().includes(searchParams.court.toLowerCase())
          );
        }
        
        if (searchParams.status) {
          filteredCases = filteredCases.filter(c => 
            c.status.toLowerCase().includes(searchParams.status.toLowerCase())
          );
        }
        
        if (searchParams.plaintiff) {
          filteredCases = filteredCases.filter(c => 
            c.plaintiff.toLowerCase().includes(searchParams.plaintiff.toLowerCase())
          );
        }
        
        if (searchParams.defendant) {
          filteredCases = filteredCases.filter(c => 
            c.defendant.toLowerCase().includes(searchParams.defendant.toLowerCase())
          );
        }
        
        resolve(filteredCases);
      }, 500);
    });
  }
};

export default caseService; 
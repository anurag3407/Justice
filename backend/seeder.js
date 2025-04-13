const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load models
const Case = require('./models/Case');
const Advocate = require('./models/Advocate');
const GlossaryTerm = require('./models/GlossaryTerms');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

// Sample case data
const cases = [
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

// Sample advocate data
const advocates = [
  {
    name: "Rakesh Sharma",
    specialization: "Family Law",
    fees: "₹5,000-10,000 per hour",
    experience: "15 years",
    contact: {
      phone: "9470234591",
      email: "rakesh.sharma@example.com",
      address: "123 Legal Avenue, New Delhi"
    },
    rating: 5.0,
    description: "Specializes in family disputes, divorce cases, and custody battles",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Priya Patel",
    specialization: "Criminal Law",
    fees: "₹7,000-12,000 per hour",
    experience: "12 years",
    contact: {
      phone: "9876543210",
      email: "priya.patel@example.com",
      address: "456 Justice Drive, Mumbai"
    },
    rating: 4.7,
    description: "Expert in criminal defense with extensive courtroom experience",
    image: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    name: "Amit Sharma",
    specialization: "Civil Law",
    fees: "₹4,000-8,000 per hour",
    experience: "8 years",
    contact: {
      phone: "8765432109",
      email: "amit.sharma@example.com",
      address: "789 Legal Street, Bangalore"
    },
    rating: 4.5,
    description: "Specializes in property disputes and civil matters",
    image: "https://randomuser.me/api/portraits/men/67.jpg"
  }
];

// Sample glossary terms
const glossaryTerms = [
  {
    term: "Bail",
    definition: "A security, typically a sum of money, required to be paid by or on behalf of a defendant to secure their temporary release from custody while awaiting trial.",
    category: "Criminal Law"
  },
  {
    term: "Hearing",
    definition: "A proceeding before a judge or court where evidence and arguments are presented to resolve a dispute or make a legal decision.",
    category: "General"
  },
  {
    term: "Affidavit",
    definition: "A written statement confirmed by oath or affirmation for use as evidence in court or before an authorized officer.",
    category: "Procedure"
  },
  {
    term: "Plaintiff",
    definition: "The party who initiates a lawsuit in civil proceedings against a defendant, claiming legal remedy for damages or injury.",
    category: "Civil Law"
  },
  {
    term: "Defendant",
    definition: "The party against whom a civil lawsuit is filed or a criminal charge is brought in a court of law.",
    category: "General"
  }
];

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await Case.deleteMany();
    await Advocate.deleteMany();
    await GlossaryTerm.deleteMany();

    // Import new data
    await Case.insertMany(cases);
    await Advocate.insertMany(advocates);
    await GlossaryTerm.insertMany(glossaryTerms);

    console.log('Data imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete all data
const deleteData = async () => {
  try {
    await Case.deleteMany();
    await Advocate.deleteMany();
    await GlossaryTerm.deleteMany();

    console.log('Data destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Execute based on command line args
if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
} 
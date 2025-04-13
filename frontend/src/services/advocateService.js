/**
 * Service for fetching advocates data
 */

// Dummy data from seeder.js
const dummyAdvocates = [
  {
    _id: "1",
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
    image: "https://images.unsplash.com/photo-1564564244660-5d73c057f2d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    _id: "2",
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
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    _id: "3",
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
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    _id: "4",
    name: "Sunita Desai",
    specialization: "Corporate Law",
    fees: "₹8,000-15,000 per hour",
    experience: "18 years",
    contact: {
      phone: "9550123456",
      email: "sunita.desai@example.com",
      address: "27 Business Park, Pune"
    },
    rating: 4.9,
    description: "Corporate law expert specializing in mergers, acquisitions, and business litigation",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    _id: "5",
    name: "Vikram Malhotra",
    specialization: "Constitutional Law",
    fees: "₹10,000-20,000 per hour",
    experience: "22 years",
    contact: {
      phone: "9765432101",
      email: "vikram.malhotra@example.com",
      address: "14 Supreme Court Lane, Delhi"
    },
    rating: 4.8,
    description: "Former high court judge with expertise in constitutional matters and public interest litigation",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    _id: "6",
    name: "Aisha Khan",
    specialization: "Family Law",
    fees: "₹6,000-11,000 per hour",
    experience: "10 years",
    contact: {
      phone: "9812345670",
      email: "aisha.khan@example.com",
      address: "23 Family Court Road, Hyderabad"
    },
    rating: 4.6,
    description: "Specializes in divorce settlements and child custody with a focus on mediation and peaceful resolution",
    image: "https://images.unsplash.com/photo-1598346763242-7fbe5769efd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  }
];

// Function to fetch advocates data
export const fetchAdvocates = async () => {
  try {
    // Return the dummy data instead of making an API call
    return Promise.resolve(dummyAdvocates);
  } catch (error) {
    console.error('Error fetching advocates:', error);
    throw error;
  }
};

export const fetchAdvocateById = async (id) => {
  try {
    // Find the advocate with the matching ID from dummy data
    const advocate = dummyAdvocates.find(adv => adv._id === id);
    
    if (!advocate) {
      throw new Error(`Advocate with ID ${id} not found`);
    }
    
    return Promise.resolve(advocate);
  } catch (error) {
    console.error(`Error fetching advocate with ID ${id}:`, error);
    throw error;
  }
};

export const fetchAdvocatesBySpecialization = async (specialization) => {
  try {
    // Filter advocates by specialization from dummy data
    const filteredAdvocates = dummyAdvocates.filter(
      adv => adv.specialization.toLowerCase() === specialization.toLowerCase()
    );
    
    return Promise.resolve(filteredAdvocates);
  } catch (error) {
    console.error(`Error fetching advocates with specialization ${specialization}:`, error);
    throw error;
  }
}; 
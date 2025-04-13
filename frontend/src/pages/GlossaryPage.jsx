import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import glossaryService from '../api/glossaryService';

const GlossaryPage = () => {
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [visibleIndex, setVisibleIndex] = useState(null);

  useEffect(() => {
    const fetchGlossaryTerms = async () => {
      try {
        setLoading(true);
        
        try {
          // Try to fetch from the API
          const data = await glossaryService.getGlossaryTerms();
          setTerms(data);
          
          // Extract unique categories
          const uniqueCategories = [...new Set(data.map(term => term.category))];
          setCategories(['All', ...uniqueCategories]);
        } catch (err) {
          // If API call fails, use mock data
          console.error('Error fetching from API, using mock data:', err);
          // For demo, use static mock data
          const mockData = [
            {
              id: 1,
              term: "Bail",
              definition: "A security, typically a sum of money, required to be paid by or on behalf of a defendant to secure their temporary release from custody while awaiting trial.",
              category: "Criminal Law"
            },
            {
              id: 2,
              term: "Hearing",
              definition: "A proceeding before a judge or court where evidence and arguments are presented to resolve a dispute or make a legal decision.",
              category: "General"
            },
            {
              id: 3,
              term: "Affidavit",
              definition: "A written statement confirmed by oath or affirmation for use as evidence in court or before an authorized officer.",
              category: "Procedure"
            },
            {
              id: 4,
              term: "Plaintiff",
              definition: "The party who initiates a lawsuit in civil proceedings against a defendant, claiming legal remedy for damages or injury.",
              category: "Civil Law"
            },
            {
              id: 5,
              term: "Defendant",
              definition: "The party against whom a civil lawsuit is filed or a criminal charge is brought in a court of law.",
              category: "General"
            },
            {
              id: 6,
              term: "Habeas Corpus",
              definition: "A legal recourse or writ by which a person can report an unlawful detention or imprisonment to a court and request that the court order the custodian of the person to bring the prisoner to court, to determine whether the detention is lawful.",
              category: "Constitutional Law"
            },
            {
              id: 7,
              term: "Due Process",
              definition: "The legal requirement that the state must respect all legal rights that are owed to a person, ensuring fair treatment through the normal judicial system.",
              category: "Constitutional Law"
            },
            {
              id: 8,
              term: "Tort",
              definition: "A civil wrong that causes someone else to suffer loss or harm, resulting in legal liability for the person who commits the act.",
              category: "Civil Law"
            },
            {
              id: 9,
              term: "Precedent",
              definition: "A principle or rule established in a previous legal case that is either binding on or persuasive for a court when deciding subsequent cases with similar issues or facts.",
              category: "General"
            },
            {
              id: 10,
              term: "Statute of Limitations",
              definition: "A law that sets the maximum time after an event within which legal proceedings may be initiated.",
              category: "Procedure"
            },
            {
              id: 11,
              term: "Pro Bono",
              definition: "Professional work undertaken voluntarily and without payment as a public service. It is common in the legal profession as a way to provide access to justice for those who cannot afford legal fees.",
              category: "Legal Practice"
            },
            {
              id: 12,
              term: "Subpoena",
              definition: "A writ ordering a person to attend a court to give testimony or to produce documents or other evidence.",
              category: "Procedure"
            },
            {
              id: 13,
              term: "Adjournment",
              definition: "The postponement of a hearing, trial, or other scheduled court proceedings to a future date.",
              category: "Procedure"
            },
            {
              id: 14,
              term: "Acquittal",
              definition: "A judgment that a person is not guilty of the crime with which they have been charged.",
              category: "Criminal Law"
            },
            {
              id: 15,
              term: "Jurisprudence",
              definition: "The theory and philosophy of law, and the scholarly study of the principles upon which legal rules are based.",
              category: "Legal Theory"
            },
            {
              id: 16,
              term: "Injunction",
              definition: "A court order requiring a person to do or cease doing a specific action, often used to prevent harm or maintain status quo until a case is resolved.",
              category: "Civil Law"
            },
            {
              id: 17,
              term: "Amicus Curiae",
              definition: "Latin for 'friend of the court'. It refers to someone who is not a party to a case but assists the court by offering information or expertise.",
              category: "Procedure"
            },
            {
              id: 18,
              term: "Voir Dire",
              definition: "The preliminary examination of a witness or juror to determine their competency to give evidence or serve on a jury.",
              category: "Procedure"
            },
            {
              id: 19,
              term: "Nolo Contendere",
              definition: "A plea in a criminal case in which the defendant neither admits nor disputes the charges, but accepts the punishment as if guilty.",
              category: "Criminal Law"
            },
            {
              id: 20,
              term: "Mens Rea",
              definition: "The mental element of a person's intention to commit a crime or knowledge that their action or lack of action would cause a crime to occur.",
              category: "Criminal Law"
            },
            {
              id: 21,
              term: "Ex Parte",
              definition: "A legal proceeding brought by one person in the absence of and without representation or notification of other parties.",
              category: "Procedure"
            },
            {
              id: 22,
              term: "Certiorari",
              definition: "A writ seeking judicial review, commonly used when requesting that the Supreme Court review a decision of a lower court.",
              category: "Procedure"
            },
            {
              id: 23,
              term: "Class Action",
              definition: "A type of lawsuit where one or more plaintiffs bring a case on behalf of a larger group of affected individuals.",
              category: "Civil Law"
            },
            {
              id: 24,
              term: "Estoppel",
              definition: "A legal principle that prevents someone from arguing something or asserting a right that contradicts what they previously said or agreed to by law.",
              category: "Civil Law"
            },
            {
              id: 25,
              term: "Guardian Ad Litem",
              definition: "A person appointed by the court to represent the interests of minors, the unborn, or incompetent persons in legal proceedings.",
              category: "Family Law"
            },
            {
              id: 26,
              term: "Fiduciary",
              definition: "A person who holds a legal or ethical relationship of trust with another party and is obligated to act in their best interest.",
              category: "Business Law"
            },
            {
              id: 27,
              term: "Prima Facie",
              definition: "A legal claim that has sufficient evidence to proceed to trial or judgment unless contradicted or overcome by evidence to the contrary.",
              category: "General"
            },
            {
              id: 28,
              term: "Writ of Execution",
              definition: "A court order that puts in force a judgment of possession and directs a law enforcement official to begin the process of transferring property or evicting a person.",
              category: "Civil Law"
            },
            {
              id: 29,
              term: "Proximate Cause",
              definition: "A cause that directly produces an event and without which the event would not have occurred; legally sufficient to result in liability.",
              category: "Tort Law"
            },
            {
              id: 30,
              term: "Stare Decisis",
              definition: "A legal doctrine that obligates courts to follow historical cases when making a ruling on a similar case. Latin for 'to stand by things decided.'",
              category: "Legal Theory"
            }
          ];
          
          setTerms(mockData);
          
          // Extract unique categories from mock data
          const uniqueCategories = [...new Set(mockData.map(term => term.category))];
          setCategories(['All', ...uniqueCategories]);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load glossary terms');
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchGlossaryTerms();
  }, []);

  // Filter terms based on search and category
  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleTerm = (index) => {
    if (visibleIndex === index) {
      setVisibleIndex(null);
    } else {
      setVisibleIndex(index);
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4 text-[#262626]">Legal Glossary</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Expand your legal knowledge with our comprehensive collection of legal terms and definitions.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 max-w-5xl mx-auto">
            <div className="mb-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search terms or definitions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CB69F] focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-[#262626] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#4CB69F]"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg text-center">
                <p>{error}</p>
              </div>
            ) : filteredTerms.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredTerms.map((term, index) => (
                  <div 
                    key={term.id} 
                    className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div 
                      className={`flex justify-between items-center p-4 cursor-pointer ${visibleIndex === index ? 'bg-[#262626] text-white' : 'bg-white hover:bg-gray-50'}`}
                      onClick={() => toggleTerm(index)}
                    >
                      <h3 className={`text-lg font-semibold ${visibleIndex === index ? 'text-white' : 'text-[#262626]'}`}>
                        {term.term}
                      </h3>
                      <div className="flex items-center">
                        <span className={`text-xs font-medium px-3 py-1 rounded-full mr-3 ${
                          visibleIndex === index 
                            ? 'bg-[#4CB69F] text-white' 
                            : 'bg-[#F5F5F5] text-[#262626]'
                        }`}>
                          {term.category}
                        </span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 transition-transform duration-200 ${visibleIndex === index ? 'rotate-180 text-white' : 'text-[#4CB69F]'}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {visibleIndex === index && (
                      <div className="p-6 bg-[#F5F5F5] border-t border-gray-100">
                        <p className="text-gray-700 leading-relaxed">{term.definition}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="text-xl font-medium text-gray-500 mb-2">No terms found</p>
                <p className="text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          {filteredTerms.length > 0 && (
            <div className="text-center mt-6 text-gray-500 text-sm">
              Showing {filteredTerms.length} of {terms.length} legal terms
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GlossaryPage;
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#262626] text-[#F5F5F5] py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 text-[#4CB69F]">JusticeTrack</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Helping people navigate the legal system with transparency and accessibility.
            </p>
            <p className="text-xs text-gray-400">© {currentYear} JusticeTrack | Hackathon Prototype</p>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-bold mb-4 text-[#4CB69F]">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-[#4CB69F] transition-colors duration-200">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#4CB69F] transition-colors duration-200">Advocates</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#4CB69F] transition-colors duration-200">Case Tracking</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#4CB69F] transition-colors duration-200">Legal Glossary</a></li>
            </ul>
          </div>
          
          <div className="text-center md:text-right">
            <h3 className="text-lg font-bold mb-4 text-[#4CB69F]">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-[#4CB69F] transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#4CB69F] transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#4CB69F] transition-colors duration-200">Disclaimer</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#4CB69F] transition-colors duration-200">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-xs text-gray-400">
          <p>Disclaimer: This application uses mock data and is intended for demonstration purposes only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
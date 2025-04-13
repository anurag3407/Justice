import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CaseResultPage from './pages/CaseResultPage';
import GlossaryPage from './pages/GlossaryPage';
import AdvocatesPage from './pages/AdvocatesPage';
import AccountPage from './pages/AccountPage';
import CaseSummarizerPage from './pages/CaseSummarizerPage';
import { AuthProvider } from './components/Header';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/case-result" element={<CaseResultPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/advocates" element={<AdvocatesPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/case-summarizer" element={<CaseSummarizerPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

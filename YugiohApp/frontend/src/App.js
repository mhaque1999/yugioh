import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import DeckBuilderPage from './pages/DeckBuilderPage';
import CommunityHubPage from './pages/CommunityHubPage';
import Navbar from './components/Common/NavBar';
import './style/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deck-builder/:deckId?" element={<DeckBuilderPage />} />
          <Route path="/community-hub" element={<CommunityHubPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

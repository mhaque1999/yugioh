import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import DeckBuilderPage from './pages/DeckBuilderPage';
import CommunityHubPage from './pages/CommunityHubPage';
import DeckDetails from './components/Deck/DeckDetails';
import Navbar from './components/Common/NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider, useAuth } from './pages/AuthContext';
import './style/App.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/deck-builder/:deckId?" element={<PrivateRoute><DeckBuilderPage /></PrivateRoute>} />
            <Route path="/community-hub" element={<CommunityHubPage />} />
            <Route path="/community/:deckId" element={<DeckDetails />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeckList from '../components/Deck/DeckList';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Dashboard.css';

function Dashboard() {
  const [decks, setDecks] = useState([]);

  const navigate = useNavigate();

  const handleNewClick = () => {
    navigate(`/deck-builder/`);
  };

  useEffect(() => {
    const fetchUserDecks = async () =>{

      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const response = await axios.post('/api/decks/userdecks', { userId: decodedToken.userId });
        setDecks(response.data);
      } catch (error) {
        console.error('Error fetching user decks:', error);
      }
    };

    fetchUserDecks();
  }, []);

  return (
    <div className="dashboard">
      <button onClick={handleNewClick}>New Deck</button>
      <h2>Your Decks</h2>
      <DeckList decks={decks} />
    </div>
  );
}

export default Dashboard;

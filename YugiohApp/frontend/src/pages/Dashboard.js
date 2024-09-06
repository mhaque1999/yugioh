import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeckList from '../components/Deck/DeckList';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Dashboard.css';
import axiosInstance from '../axiosHeader';

function Dashboard() {
  const [decks, setDecks] = useState([]);
  const [isLoadingNewDeck, setIsLoadingNewDeck] = useState(false);

  const navigate = useNavigate();

  const handleNewClick = () => {
    setIsLoadingNewDeck(true);
    //navigate(`/deck-builder/`);
    setTimeout(() => {
      navigate(`/deck-builder/`);
    }, 500); //testing the load
  };

  useEffect(() => {
    const fetchUserDecks = async () =>{

      try {
        const token = localStorage.getItem('token');
        
        //const decodedToken = jwtDecode(token);
        const response = await axiosInstance.post('/api/decks/userdecks');
        setDecks(response.data);
      } catch (error) {
        console.error('Error fetching user decks:', error);
      }
    };

    fetchUserDecks();
  }, []);

  return (
    <div className="dashboard">
      <button onClick={handleNewClick} disabled={isLoadingNewDeck}>
        {isLoadingNewDeck ? 'Creating Deck...' : 'New Deck'}
      </button>
      <h2>Your Decks</h2>
      <DeckList decks={decks} />
    </div>
  );
}

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeckBuilder from '../components/Deck/DeckBuilder';
import './DeckBuilderPage.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../axiosHeader';
import { useAuth } from './AuthContext';

function DeckBuilderPage() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [publicDeck, setPublicDeck] = useState(false); //
  const [selectedCards, setSelectedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deckName, setDeckName] = useState(''); 
  const [message, setMessage] = useState('');

  const { getUserId } = useAuth();
  

  useEffect(() => {
    
    const fetchDeckData = async () => {
      try {
        const response = await axiosInstance.get(`/api/decks/${deckId}`);
        setDeck(response.data);
        setPublicDeck(response.data.public); //
        setSelectedCards(response.data.Cards || []);
        setDeckName(response.data.name || '');
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching deck:', error);
        setError('Failed to load deck data');
        setIsLoading(false);
      }
    };

    if (deckId) {
      fetchDeckData();
    } else {
      setIsLoading(false);
    }
  }, [deckId]);

  const handleSaveDeck = async () => {
    try {
      const userId = getUserId();
      console.log(selectedCards.length);
      console.log("im from deckbuilderpage", selectedCards)
      const currentDeckName = deckName; 
      
      if (!currentDeckName || selectedCards.length === 0) {
        console.error('Deck name and selected cards are required');
        setError('Deck name and selected cards are required');
        return;
      }
      console.log(selectedCards)
      const cardIds = selectedCards.map(card => ({
        id: card.id,
        count: card.DeckCard ? card.DeckCard.count : card.count_in_deck
      }));
      console.log(cardIds);
      
      if (deckId) {
        // Update deck name
        console.log(publicDeck)
        await axiosInstance.put(`/api/decks/${deckId}/${userId}`, { name: currentDeckName, isPublic: publicDeck });

      
        // Clear existing cards from the deck
        await axiosInstance.delete(`/api/decks/removecards/${deckId}/${userId}`);

        // Add cards to the deck
        await axiosInstance.post(`/api/cards/${userId}/decks/${deckId}/add`, { cardIds });
        setMessage('Deck saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        // Create new deck
        const response = await axiosInstance.post('/api/decks', { name: currentDeckName, userId });
        const newDeckId = response.data.id;
  
        // Add cards to the newly created deck
        await axiosInstance.post(`/api/cards/${userId}/decks/${newDeckId}/add`, { cardIds });

        // Navigate to the deck builder with the new deck ID
        navigate(`/deck-builder/${newDeckId}`);
        setMessage('Deck saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error saving deck:', error.response ? error.response.data : error.message);
      console.error('Error saving deck:', error);
      setError('Failed to save deck');
      setMessage('Failed to save deck.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const isSaveDisabled = !deckName || selectedCards.length === 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="deck-builder-page">
      <h2>{deckId ? `Edit Deck: ${deckName}` : 'Build Your Deck'}</h2>
      <div className="checkbox-container">
      <input
        type="checkbox"
        checked={publicDeck}
        onChange={(event) => setPublicDeck(event.target.checked)}
        id="publicDeckCheckbox"
      />
      <label htmlFor="publicDeckCheckbox">
        <span role="img" aria-label="Public Deck">🌐</span> Public
      </label>
    </div>
      {message && <div className="message">{message}</div>}
      <DeckBuilder
        deckName={deckName} 
        selectedCards={selectedCards}
        setSelectedCards={setSelectedCards}
        onSave={handleSaveDeck}
        setDeckName={setDeckName}
        isSaveDisabled={isSaveDisabled} 
      />
    </div>
  );
}

export default DeckBuilderPage;


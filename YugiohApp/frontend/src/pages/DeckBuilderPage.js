import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeckBuilder from '../components/Deck/DeckBuilder';
import './DeckBuilderPage.css';
import axios from 'axios';

function DeckBuilderPage() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deckName, setDeckName] = useState(''); 

  useEffect(() => {
    
    const fetchDeckData = async () => {
      try {
        const response = await axios.get(`/api/decks/${deckId}`);
        setDeck(response.data);
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
        await axios.put(`/api/decks/${deckId}`, { name: currentDeckName });
        console.log(cardIds)
        // Add cards to the deck
        await axios.post(`/api/cards/${deckId}/add`, { cardIds });
  
      } else {
        // Create new deck
        const response = await axios.post('/api/decks', { name: currentDeckName });
        const newDeckId = response.data.id;
  
        // Add cards to the newly created deck
        await axios.post(`/api/cards/${newDeckId}/add`, { cardIds });
  
        // Navigate to the deck builder with the new deck ID
        navigate(`/deck-builder/${newDeckId}`);
      }
    } catch (error) {
      console.error('Error saving deck:', error.response ? error.response.data : error.message);
      console.error('Error saving deck:', error);
      setError('Failed to save deck');
    }
  };
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="deck-builder-page">
      <h2>{deckId ? `Edit Deck: ${deckName}` : 'Build Your Deck'}</h2>
      <DeckBuilder
        deckName={deckName} 
        selectedCards={selectedCards}
        setSelectedCards={setSelectedCards}
        onSave={handleSaveDeck}
        setDeckName={setDeckName} 
      />
    </div>
  );
}

export default DeckBuilderPage;


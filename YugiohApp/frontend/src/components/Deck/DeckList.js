import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DeckList.css';

function DeckList() {
  const [decks, setDecks] = useState([]);

  const navigate = useNavigate();

  const handleEditClick = (deckId) => {
    navigate(`/deck-builder/${deckId}`);
  };

  useEffect(() => {
    axios.get('/api/decks')
      .then(response => setDecks(response.data))
      .catch(error => console.error('Error fetching decks:', error));
  }, []);

  return (
    <div className="deck-list">
      <h2>Your Decks</h2>
      <div className="deck-cards">
        {decks.length > 0 ? (
          decks.map(deck => (
            <div key={deck.id} className="deck-card">
              <h3>{deck.name}</h3>
              <p>{deck.description}</p>
              <button onClick={() => handleEditClick(deck.id)}>Edit</button>
            </div>
          ))
        ) : (
          <p>No decks found. Create a new deck to get started!</p>
        )}
      </div>
    </div>
  );
}

export default DeckList;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DeckList.css';

function DeckList({ decks }) {
  const navigate = useNavigate();

  const handleEditClick = (deckId) => {
    navigate(`/deck-builder/${deckId}`);
  };

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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeckList.css';

function DeckList({ decks }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleEditClick = (deckId) => {
    setLoading(true); //might need something to change back to false?
    navigate(`/deck-builder/${deckId}`);
  };

  useEffect(() => {
    if (decks) {
      setLoading(false); 
    }
  }, [decks]);

  if (loading) return <p>Loading...</p>;
  
  return (
    <div className="deck-list">
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



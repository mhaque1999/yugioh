import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommunityHub.css';

function CommunityHub() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    axios.get('/api/community-decks')
      .then(response => setDecks(response.data))
      .catch(error => console.error('Error fetching community decks:', error));
  }, []);

  return (
    <div className="community-hub">
      <h2>Community Hub</h2>
      <div className="deck-list">
        {decks.length > 0 ? (
          decks.map(deck => (
            <div key={deck.id} className="deck-card">
              <h3>{deck.name}</h3>
              <p>{deck.description}</p>
              <button onClick={() => alert('Details feature coming soon!')}>View Details</button>
            </div>
          ))
        ) : (
          <p>No community decks found. Share your deck to be featured here!</p>
        )}
      </div>
    </div>
  );
}

export default CommunityHub;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommunityHubPage.css';
import { Link } from 'react-router-dom';

function CommunityHub() {
  const [decks, setDecks] = useState([]);

  useEffect(async () => {
    await axios.get('/api/decks')
      .then(response => setDecks(response.data))
      .catch(error => console.error('Error fetching public decks:', error));
  }, []);

  return (
    <div className="community-hub">
      <h2>Community Hub</h2>
      {/* {decks.length > 0 ? (
        decks.map(deck => (
          <div key={deck.id} className="deck-card">
            <h3>{deck.name}</h3>
            <p>Created by: {deck.user.username}</p>
            <p>Timestamp: {new Date(deck.createdAt).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No public decks available</p>
      )} */}
      <table>
        <thead>
          <tr>
            <th>Deck Name</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {decks.map((deck) => (
            <tr key={deck.id}>
              <td>
                <Link to={`/community/${deck.id}`}>
                  {deck.name}
                </Link>
              </td>
              <td>{deck.user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CommunityHub;

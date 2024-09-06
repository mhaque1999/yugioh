import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommunityHubPage.css';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosHeader';

function CommunityHubPage() {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/api/decks');
        const decksData = response.data;

        // Fetch cards for each deck
        const decksWithCards = await Promise.all(
          decksData.map(async (deck) => {
            const cardsResponse = await axiosInstance.get(`/api/decks/${deck.id}`);
            const cards = cardsResponse.data.Cards;
            return { ...deck, Cards: cards };
          })
        );

        setDecks(decksWithCards);
      } catch (error) {
        console.error('Error fetching public decks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="community-hub">
      <h2>Community Hub</h2>
      <div className="deck-list">
        {decks.length > 0 ? (
          decks.map((deck) => (
            <div key={deck.id} className="deck-card">
              <Link to={`/community/${deck.id}`}>
                {deck.Cards && deck.Cards.length > 0 ? (
                  <div className="deck-card-image">
                    <img
                      src={deck.Cards[0].image_url}
                      alt={deck.name}
                      className="artwork-image"
                    />
                  </div>
                ) : (
                  <div className="no-image">No Image Available</div>
                )}
                <div className="deck-info">
                  <h3>{deck.name}</h3>
                  <p>Owner: {deck.user.username}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No public decks available</p>
        )}
      </div>
    </div>
  );
}

export default CommunityHubPage;

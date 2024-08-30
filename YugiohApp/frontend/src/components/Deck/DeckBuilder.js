import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeckBuilder.css'; 
import { getImageUrl } from '../../utils/util';

function DeckBuilder({ deckName = '', selectedCards = [], onSave, setSelectedCards, setDeckName, deckId, isSaveDisabled }) {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch all available cards on component mount
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/cards');
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  // Fetch deck details if deckId is present
  useEffect(() => {
    if (deckId) {
      const fetchDeck = async () => {
        try {
          const response = await axios.get(`/api/decks/${deckId}`);
          const deckData = response.data;
          const deckName = deckData.name;
          const deckCards = deckData.Cards;

          setDeckName(deckName);
          setSelectedCards(deckCards);
        } catch (error) {
          console.error('Error fetching deck:', error);
        }
      };

      fetchDeck();
    }
  }, [deckId, setSelectedCards, setDeckName]);

  const handleClick = (card) => {
    setSelectedCards(prevSelectedCards => {
      const existingCard = prevSelectedCards.find(selectedCard => selectedCard.id === card.id);

      if (existingCard) {
        if (existingCard.DeckCard && existingCard.DeckCard.count < 3) {
          return prevSelectedCards.map(selectedCard =>
            selectedCard.id === card.id
              ? { ...selectedCard, DeckCard: { ...selectedCard.DeckCard, count: selectedCard.DeckCard.count + 1 } }
              : selectedCard
          );
        } else if (!existingCard.DeckCard && existingCard.count_in_deck < 3) {
          return prevSelectedCards.map(selectedCard =>
            selectedCard.id === card.id
              ? { ...selectedCard, count_in_deck: selectedCard.count_in_deck + 1 }
              : selectedCard
          );
        }
        return prevSelectedCards;
      }

      return [...prevSelectedCards, { ...card, count_in_deck: 1 }];
    });
  };

  const handleRemove = (card) => {
    setSelectedCards(prevSelectedCards => {
      const existingCard = prevSelectedCards.find(selectedCard => selectedCard.id === card.id);

      if (existingCard) {
        if (existingCard.DeckCard && existingCard.DeckCard.count > 1) {
          return prevSelectedCards.map(selectedCard =>
            selectedCard.id === card.id
              ? { ...selectedCard, DeckCard: { ...selectedCard.DeckCard, count: selectedCard.DeckCard.count - 1 } }
              : selectedCard
          );
        } else if (!existingCard.DeckCard && existingCard.count_in_deck > 1) {
          return prevSelectedCards.map(selectedCard =>
            selectedCard.id === card.id
              ? { ...selectedCard, count_in_deck: selectedCard.count_in_deck - 1 }
              : selectedCard
          );
        }
        return prevSelectedCards.filter(selectedCard => selectedCard.id !== card.id);
      }
      return prevSelectedCards;
    });
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(e.target.value);
    }
  };

  const filteredCards = searchQuery ? cards.filter((card) =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : cards;

  const cardsToDisplay = filteredCards.slice(0, 10);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="deck-builder">
      <div className="deck-name">
        <input
          id="deck-name"
          type="text"
          placeholder="Enter Deck Name"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
        />
      </div>

      <div className="card-search">
        <input
          id="card-search"
          type="text"
          placeholder="Search By Card Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <div className="card-container">
        <div className="available-cards">
          <h3>Available Cards</h3>
          <div className="card-list">
            {cardsToDisplay.map((card) => (
              <div key={card.id} className="card-item" onClick={() => handleClick(card)}>
                <img src={card.image_url} alt={card.name} />
                <div className="card-count">{card.DeckCard ? card.DeckCard.count : card.count_in_deck}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="selected-cards">
          <h3>Selected Cards</h3>
          <div className="card-list">
            {selectedCards.map((card, index) => (
              <div key={`${card.id}-${index}`} className="card-item">
                <img src={card.image_url} alt={card.name} onClick={() => handleRemove(card)} />
                <div className="card-count">{card.DeckCard ? card.DeckCard.count : card.count_in_deck}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {onSave && <button onClick={() => onSave(selectedCards)} disabled={isSaveDisabled}>Save Deck</button>}
    </div>
  );
}

export default DeckBuilder;
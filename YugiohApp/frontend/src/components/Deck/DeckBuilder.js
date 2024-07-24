import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeckBuilder.css';

function DeckBuilder({ deckName = '', selectedCards = [], onSave, setSelectedCards, setDeckName }) {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('/api/cards')
      .then(response => setCards(response.data))
      .catch(error => console.error('Error fetching cards:', error));
  }, []);

  useEffect(() => {
    console.log('Deck name updated to:', deckName);
    setDeckName(deckName); // Update parent state when deckName changes
  }, [deckName, setDeckName]);

  const handleClick = (card) => {
    const isInSelected = selectedCards.some(selectedCard => selectedCard.id === card.id);
    const countInSelected = selectedCards.filter(selectedCard => selectedCard.id === card.id).length;

    if (isInSelected) {
      if (countInSelected < 3) {
        setSelectedCards(prevSelectedCards => [...prevSelectedCards, card]);
      }
    } else {
      setSelectedCards(prevSelectedCards => [...prevSelectedCards, card]);
    }
    console.log(selectedCards);
  };

  const handleRemove = (card) => {
    setSelectedCards(prevSelectedCards => {
      let removed = false;
      const updatedCards = prevSelectedCards.reduce((acc, selectedCard) => {
        if (selectedCard.id === card.id && !removed) {
          removed = true;
        } else {
          acc.push(selectedCard);
        }
        return acc;
      }, []);
      return updatedCards;
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

  return (
    <div className="deck-builder">
      <h2>{deckName ? `Edit Deck: ${deckName}` : 'Build Your Deck'}</h2>
      <div className="deck-name">
        <input
          type="text"
          placeholder="Deck Name"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)} // Use setDeckName from props
        />
      </div>
      <div className="card-search">
        <input
          type="text"
          placeholder="Search for cards..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
      <div className="available-cards">
        <h3>Available Cards</h3>
        <div className="card-list">
          {cardsToDisplay.map((card) => (
            <div key={card.id} className="card-item" onClick={() => handleClick(card)}>
              <img src={card.image_url} alt={card.name} />
              <p>{card.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="selected-cards">
        <h3>Selected Cards</h3>
        <div className="card-list">
          {selectedCards.map((card, index) => (
            <div key={`${card.id}-${index}`} className="card-item">
              <img
                src={card.image_url}
                alt={card.name}
                onClick={() => handleRemove(card)}
              />
              <p>{card.name}</p>
            </div>
          ))}
        </div>
      </div>
      {onSave && <button onClick={() => onSave()}>Save Deck</button>}
    </div>
  );
}

export default DeckBuilder;
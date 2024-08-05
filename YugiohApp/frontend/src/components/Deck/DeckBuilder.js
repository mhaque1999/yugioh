import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeckBuilder.css';

function DeckBuilder({ deckName = '', selectedCards = [], onSave, setSelectedCards, setDeckName, deckId }) {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all available cards on component mount
  useEffect(() => {
    axios.get('/api/cards')
      .then(response => setCards(response.data))
      .catch(error => console.error('Error fetching cards:', error));
  }, []);

  // Fetch deck details if deckId is present
  useEffect(() => {
    if (deckId) {
      axios.get(`/api/decks/${deckId}`)
        .then(response => {
          const deckData = response.data;
          const deckName = deckData.name;
          const deckCards = deckData.Cards;

          setDeckName(deckName);
          setSelectedCards(deckCards);
        })
        .catch(error => console.error('Error fetching deck:', error));
    }
  }, [deckId, setSelectedCards, setDeckName/*, cards*/]);

  
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
        console.log("this is if card count is 3 or more", prevSelectedCards);
        return prevSelectedCards;
      }
  
      console.log(prevSelectedCards);
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
        console.log("this is if card count is 1 or less, removing the card", prevSelectedCards);
        return prevSelectedCards.filter(selectedCard => selectedCard.id !== card.id);
      }
      console.log("Card not found", prevSelectedCards);
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
  console.log("final selected cards is:",selectedCards)
  //console.log("final selected card[0] is:",selectedCards[0].DeckCard.count)
  return (
    <div className="deck-builder">
      <h2>{deckName ? `Edit Deck: ${deckName}` : 'Build Your Deck'}</h2>
      <div className="deck-name">
        <input
          type="text"
          placeholder="Deck Name"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
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
              <p>Count: {card.count_in_deck || (card.DeckCard.count) || 'N/A'/*card.DeckCard ? card.DeckCard.count : 'N/A'*/}</p>
            </div>
          ))}
        </div>
      </div>
      {onSave && <button onClick={() => onSave(selectedCards)}>Save Deck</button>}
    </div>
  );
}

export default DeckBuilder;


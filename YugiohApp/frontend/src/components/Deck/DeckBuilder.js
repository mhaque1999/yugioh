// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './DeckBuilder.css';

// // function DeckBuilder({ deckName = '', selectedCards = [], onSave, setSelectedCards, setDeckName }) {
// //   const [cards, setCards] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState('');

// //   useEffect(() => {
// //     axios.get('/api/cards')
// //       .then(response => setCards(response.data))
// //       .catch(error => console.error('Error fetching cards:', error));
// //   }, []);

// //   useEffect(() => {
// //     console.log('Deck name updated to:', deckName);
// //     setDeckName(deckName); // Update parent state when deckName changes
// //   }, [deckName, setDeckName]);

// //   const handleClick = (card) => {
// //     const isInSelected = selectedCards.some(selectedCard => selectedCard.id === card.id);
// //     const countInSelected = selectedCards.filter(selectedCard => selectedCard.id === card.id).length;

// //     if (isInSelected) {
// //       if (countInSelected < 3) {
// //         setSelectedCards(prevSelectedCards => [...prevSelectedCards, card]);
// //       }
// //     } else {
// //       setSelectedCards(prevSelectedCards => [...prevSelectedCards, card]);
// //     }
// //     console.log(selectedCards);
// //   };

// //   // const handleClick = (card) => {
// //   //   setSelectedCards(prevSelectedCards => {
// //   //     const countInSelected = prevSelectedCards.filter(selectedCard => selectedCard.id === card.id).length;
  
// //   //     if (countInSelected < 3) {
// //   //       return [...prevSelectedCards, card];
// //   //     }
// //   //     return prevSelectedCards;
// //   //   });
// //   // };
  
  
// //   useEffect(() => {
// //     console.log(selectedCards);
// //   }, [selectedCards]);

// //   const handleRemove = (card) => {
// //     setSelectedCards(prevSelectedCards => {
// //       let removed = false;
// //       const updatedCards = prevSelectedCards.reduce((acc, selectedCard) => {
// //         if (selectedCard.id === card.id && !removed) {
// //           removed = true;
// //         } else {
// //           acc.push(selectedCard);
// //         }
// //         return acc;
// //       }, []);
// //       return updatedCards;
// //     });
// //   };

// //   const handleSearch = (e) => {
// //     if (e.key === 'Enter') {
// //       setSearchQuery(e.target.value);
// //     }
// //   };

// //   const filteredCards = searchQuery ? cards.filter((card) =>
// //     card.name.toLowerCase().includes(searchQuery.toLowerCase())
// //   ) : cards;

// //   const cardsToDisplay = filteredCards.slice(0, 10);

// //   const getCardCount = (cardId) => {
// //     return selectedCards.filter(card => card.id === cardId).length;
// //   };

// //   return (
// //     <div className="deck-builder">
// //       <h2>{deckName ? `Edit Deck: ${deckName}` : 'Build Your Deck'}</h2>
// //       <div className="deck-name">
// //         <input
// //           type="text"
// //           placeholder="Deck Name"
// //           value={deckName}
// //           onChange={(e) => setDeckName(e.target.value)} // Use setDeckName from props
// //         />
// //       </div>
// //       <div className="card-search">
// //         <input
// //           type="text"
// //           placeholder="Search for cards..."
// //           value={searchQuery}
// //           onChange={(e) => setSearchQuery(e.target.value)}
// //           onKeyDown={handleSearch}
// //         />
// //       </div>
// //       <div className="available-cards">
// //         <h3>Available Cards</h3>
// //         <div className="card-list">
// //           {cardsToDisplay.map((card) => (
// //             <div key={card.id} className="card-item" onClick={() => handleClick(card)}>
// //               <img src={card.image_url} alt={card.name} />
// //               <p>{card.name}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //       <div className="selected-cards">
// //         <h3>Selected Cards</h3>
// //         <div className="card-list">
// //           {selectedCards.map((card, index) => (
// //             <div key={`${card.id}-${index}`} className="card-item">
// //               <img
// //                 src={card.image_url}
// //                 alt={card.name}
// //                 onClick={() => handleRemove(card)}
// //               />
// //               <p>{card.name}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //       {onSave && <button onClick={() => onSave()}>Save Deck</button>}
// //     </div>
// //   );
// // }

// // export default DeckBuilder;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './DeckBuilder.css';

// // function DeckBuilder({ deckName = '', selectedCards = [], onSave, setSelectedCards, setDeckName }) {
// //   const [cards, setCards] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState('');

// //   useEffect(() => {
// //     axios.get('/api/cards')
// //       .then(response => setCards(response.data))
// //       .catch(error => console.error('Error fetching cards:', error));
// //   }, []);

// //   useEffect(() => {
// //     console.log('Deck name updated to:', deckName);
// //     setDeckName(deckName); 
// //   }, [deckName, setDeckName]);

// //   const handleClick = (card) => {
// //     const isInSelected = selectedCards.some(selectedCard => selectedCard.id === card.id);
// //     const countInSelected = selectedCards.filter(selectedCard => selectedCard.id === card.id).length;

// //     if (isInSelected) {
// //       if (countInSelected < 3) {
// //         setSelectedCards(prevSelectedCards => [...prevSelectedCards, card]);
// //       }
// //     } else {
// //       setSelectedCards(prevSelectedCards => [...prevSelectedCards, card]);
// //     }
// //     console.log(selectedCards);
// //   };

// //   // const handleClick = (card) => {
// //   //   setSelectedCards(prevSelectedCards => {
// //   //     const countInSelected = prevSelectedCards.filter(selectedCard => selectedCard.id === card.id).length;
  
// //   //     if (countInSelected < 3) {
// //   //       return [...prevSelectedCards, card];
// //   //     }
// //   //     return prevSelectedCards;
// //   //   });
// //   // };
  
  
// //   useEffect(() => {
// //     console.log(selectedCards);
// //   }, [selectedCards]);

// //   const handleRemove = (card) => {
// //     setSelectedCards(prevSelectedCards => {
// //       let removed = false;
// //       const updatedCards = prevSelectedCards.reduce((acc, selectedCard) => {
// //         if (selectedCard.id === card.id && !removed) {
// //           removed = true;
// //         } else {
// //           acc.push(selectedCard);
// //         }
// //         return acc;
// //       }, []);
// //       return updatedCards;
// //     });
// //   };

// //   const handleSearch = (e) => {
// //     if (e.key === 'Enter') {
// //       setSearchQuery(e.target.value);
// //     }
// //   };

// //   const filteredCards = searchQuery ? cards.filter((card) =>
// //     card.name.toLowerCase().includes(searchQuery.toLowerCase())
// //   ) : cards;

// //   const cardsToDisplay = filteredCards.slice(0, 10);

// //   return (
// //     <div className="deck-builder">
// //       <h2>{deckName ? `Edit Deck: ${deckName}` : 'Build Your Deck'}</h2>
// //       <div className="deck-name">
// //         <input
// //           type="text"
// //           placeholder="Deck Name"
// //           value={deckName}
// //           onChange={(e) => setDeckName(e.target.value)} 
// //         />
// //       </div>
// //       <div className="card-search">
// //         <input
// //           type="text"
// //           placeholder="Search for cards..."
// //           value={searchQuery}
// //           onChange={(e) => setSearchQuery(e.target.value)}
// //           onKeyDown={handleSearch}
// //         />
// //       </div>
// //       <div className="available-cards">
// //         <h3>Available Cards</h3>
// //         <div className="card-list">
// //           {cardsToDisplay.map((card) => (
// //             <div key={card.id} className="card-item" onClick={() => handleClick(card)}>
// //               <img src={card.image_url} alt={card.name} />
// //               <p>{card.name}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //       <div className="selected-cards">
// //         <h3>Selected Cards</h3>
// //         <div className="card-list">
// //           {selectedCards.map((card, index) => (
// //             <div key={`${card.id}-${index}`} className="card-item">
// //               <img
// //                 src={card.image_url}
// //                 alt={card.name}
// //                 onClick={() => handleRemove(card)}
// //               />
// //               <p>{card.name}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //       {onSave && <button onClick={() => onSave()}>Save Deck</button>}
// //     </div>
// //   );
// // }

// // export default DeckBuilder;


// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './DeckBuilder.css';

// // function DeckBuilder({ deckName = '', selectedCards = [], onSave, setSelectedCards, setDeckName, deckId }) {
// //   const [cards, setCards] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState('');

// //   useEffect(() => {
// //     axios.get('/api/cards')
// //       .then(response => setCards(response.data))
// //       .catch(error => console.error('Error fetching cards:', error));
// //   }, []);

// //   useEffect(() => {
// //     if (deckId) {
// //       axios.get(`/api/decks/${deckId}`)
// //         .then(response => setSelectedCards(response.data.cards))
// //         .catch(error => console.error('Error fetching deck:', error));
// //     }
// //   }, [deckId, setSelectedCards]);

// //   const handleClick = (card) => {
// //     const countInSelected = selectedCards.filter(selectedCard => selectedCard.id === card.id).length;
// //     if (countInSelected < 3) {
// //       setSelectedCards(prevSelectedCards => [...prevSelectedCards, { ...card, count_in_deck: countInSelected + 1 }]);
// //     }
// //     console.log(selectedCards)
// //   };

// //   const handleRemove = (card) => {
// //     setSelectedCards(prevSelectedCards => {
// //       let removed = false;
// //       return prevSelectedCards.reduce((acc, selectedCard) => {
// //         if (selectedCard.id === card.id && !removed) {
// //           removed = true;
// //         } else {
// //           acc.push(selectedCard);
// //         }
// //         return acc;
// //       }, []);
// //     });
// //   };

// //   const handleSearch = (e) => {
// //     if (e.key === 'Enter') {
// //       setSearchQuery(e.target.value);
// //     }
// //   };

// //   const filteredCards = searchQuery ? cards.filter((card) =>
// //     card.name.toLowerCase().includes(searchQuery.toLowerCase())
// //   ) : cards;

// //   const cardsToDisplay = filteredCards.slice(0, 10);

// //   return (
// //     <div className="deck-builder">
// //       <h2>{deckName ? `Edit Deck: ${deckName}` : 'Build Your Deck'}</h2>
// //       <div className="deck-name">
// //         <input
// //           type="text"
// //           placeholder="Deck Name"
// //           value={deckName}
// //           onChange={(e) => setDeckName(e.target.value)} // Use setDeckName from props
// //         />
// //       </div>
// //       <div className="card-search">
// //         <input
// //           type="text"
// //           placeholder="Search for cards..."
// //           value={searchQuery}
// //           onChange={(e) => setSearchQuery(e.target.value)}
// //           onKeyDown={handleSearch}
// //         />
// //       </div>
// //       <div className="available-cards">
// //         <h3>Available Cards</h3>
// //         <div className="card-list">
// //           {cardsToDisplay.map((card) => (
// //             <div key={card.id} className="card-item" onClick={() => handleClick(card)}>
// //               <img src={card.image_url} alt={card.name} />
// //               <p>{card.name}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //       <div className="selected-cards">
// //         <h3>Selected Cards</h3>
// //         <div className="card-list">
// //           {selectedCards.map((card, index) => (
// //             <div key={`${card.id}-${index}`} className="card-item">
// //               <img
// //                 src={card.image_url}
// //                 alt={card.name}
// //                 onClick={() => handleRemove(card)}
// //               />
// //               <p>{card.name}</p>
// //               <p>Count: {selectedCards.filter(c => c.id === card.id).length}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //       {onSave && <button onClick={() => onSave(selectedCards)}>Save Deck</button>}
// //     </div>
// //   );
// // }

// // export default DeckBuilder;

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

          // // Fetch details of each card in the deck based on card IDs
          // const selectedCardsWithDetails = deckCards.map(deckCard => {
          //   const cardDetails = cards.find(card => card.id === deckCard.id);
          //   if (cardDetails) {
          //     console.log("Hi from deckbuilder the count is:", deckCard.DeckCard.count)
          //     return {
          //       ...cardDetails,
          //       count_in_deck: deckCard.DeckCard.count//deckCard.count_in_deck
          //     };
          //   }
          //   return null;
          // }).filter(card => card !== null);

          setDeckName(deckName);
          setSelectedCards(deckCards);
        })
        .catch(error => console.error('Error fetching deck:', error));
    }
  }, [deckId, setSelectedCards, setDeckName/*, cards*/]);

  // const handleClick = (card) => {
  //   setSelectedCards(prevSelectedCards => {
  //     const existingCard = prevSelectedCards.find(selectedCard => selectedCard.id === card.id);
  //     if (existingCard) {
  //       if (existingCard.count_in_deck < 3) {
  //         return prevSelectedCards.map(selectedCard => 
  //           selectedCard.id === card.id 
  //             ? { ...selectedCard, count_in_deck: selectedCard.count_in_deck + 1 } 
  //             : selectedCard
  //         );
  //       }
  //       console.log("this is if card is more than 3", selectedCards)
  //       return prevSelectedCards;
  //     }console.log(selectedCards)
  //     return [...prevSelectedCards, { ...card, count_in_deck: 1 }];
  //   });
  // };

  // const handleRemove = (card) => {
  //   setSelectedCards(prevSelectedCards => {
  //     const existingCard = prevSelectedCards.find(selectedCard => selectedCard.id === card.id);
  //     if (existingCard) {
  //       if (existingCard.count_in_deck > 1 || existingCard.DeckCard.count > 1) {
  //         return prevSelectedCards.map(selectedCard => 
  //           selectedCard.id === card.id 
  //             ? { ...selectedCard, count_in_deck: selectedCard.count_in_deck - 1 || selectedCard.DeckCard.count } 
  //             : selectedCard
  //         );
  //       }
  //       return prevSelectedCards.filter(selectedCard => selectedCard.id !== card.id);
  //     }
  //     return prevSelectedCards;
  //   });
  // };
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


//to look at other users deck details
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DeckDetails() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeckDetails = async () => {
      try {
        const response = await axios.get(`/api/decks/${deckId}`);
        setDeck(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching deck details:', error);
        setError('Failed to load deck details');
        setIsLoading(false);
      }
    };

    fetchDeckDetails();
  }, [deckId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{deck.name}</h1>
      <p><strong>Notes:</strong> {deck.description || 'No notes available'}</p>
      <table>
        <thead>
          <tr>
            <th>Card Name</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {deck.Cards.map((card) => (
            <tr key={card.id}>
              <td>{card.name}</td>
              <td><img src={card.image_url} alt={card.name} width="100" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeckDetails;

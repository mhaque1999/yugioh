// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CommunityHubPage.css';
// import { Link } from 'react-router-dom';

// function CommunityHub() {
//   const [decks, setDecks] = useState([]);

//   useEffect(async () => {
//     await axios.get('/api/decks')
//       .then(response => setDecks(response.data))
//       .catch(error => console.error('Error fetching public decks:', error));
//   }, []);

//   return (
//     <div className="community-hub">
//       <h2>Community Hub</h2>
//       {/* {decks.length > 0 ? (
//         decks.map(deck => (
//           <div key={deck.id} className="deck-card">
//             <h3>{deck.name}</h3>
//             <p>Created by: {deck.user.username}</p>
//             <p>Timestamp: {new Date(deck.createdAt).toLocaleString()}</p>
//           </div>
//         ))
//       ) : (
//         <p>No public decks available</p>
//       )} */}
//       <table>
//         <thead>
//           <tr>
//             <th>Deck Name</th>
//             <th>Owner</th>
//           </tr>
//         </thead>
//         <tbody>
//           {decks.map((deck) => (
//             <tr key={deck.id}>
//               <td>
//                 <Link to={`/community/${deck.id}`}>
//                   {deck.name}
//                 </Link>
//               </td>
//               <td>{deck.user.username}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default CommunityHub;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CommunityHubPage.css';
// import { Link } from 'react-router-dom';

// function CommunityHub() {
//   const [decks, setDecks] = useState([]);

//   useEffect(() => {
//     const fetchDecks = async () => {
//       try {
//         const response = await axios.get('/api/decks');
//         setDecks(response.data);
//       } catch (error) {
//         console.error('Error fetching public decks:', error);
//       }
//     };

//     fetchDecks();
//   }, []);

//   decks.map(deck => (console.log(deck)));
//   return (
//     <div className="community-hub">
//       <h2>Community Hub</h2>
//       <div className="deck-list">
//         {decks.length > 0 ? (
//           decks.map(deck => (
//             <div key={deck.id} className="deck-card">
//               <Link to={`/community/${deck.id}`}>
//                 <img src={deck.Cards[0].image_url} alt={deck.name} className="deck-card-image" />
//                 <div className="deck-info">
//                   <h3>{deck.name}</h3>
//                   <p>Owner: {deck.user.username}</p>
//                 </div>
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p>No public decks available</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CommunityHub;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CommunityHubPage.css';
// import { Link } from 'react-router-dom';

// function CommunityHubPage() {
//   const [decks, setDecks] = useState([]);
//   const [loading, setLoading] = useState(true); // Add loading state

//   useEffect(() => {
//     const fetchDecks = async () => {
//       try {
//         setLoading(true); // Set loading to true before fetching
//         const response = await axios.get('/api/decks');
//         const decksData = response.data;

//         // Set the decks state with the fetched data
//         setDecks(decksData);
//       } catch (error) {
//         console.error('Error fetching public decks:', error);
//       } finally {
//         setLoading(false); // Set loading to false after fetching
//       }
//     };

//     fetchDecks();
//   }, []);

//   if (loading) return <p>Loading...</p>; // Show loading message

//   return (
//     <div className="community-hub">
//       <h2>Community Hub</h2>
//       <div className="deck-list">
//         {decks.length > 0 ? (
//           decks.map(deck => (
//             <div key={deck.id} className="deck-card">
//               <Link to={`/community/${deck.id}`}>
//                 {deck.Cards && deck.Cards.length > 0 ? (
//                   <img src={deck.Cards[0].image_url} alt={deck.name} className="deck-card-image" />
//                 ) : (
//                   <div className="no-image">No Image Available</div>
//                 )}
//                 <div className="deck-info">
//                   <h3>{deck.name}</h3>
//                   <p>Owner: {deck.user.username}</p>
//                 </div>
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p>No public decks available</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CommunityHubPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CommunityHubPage.css';
// import { Link } from 'react-router-dom';

// function CommunityHubPage() {
//   const [decks, setDecks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDecks = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('/api/decks');
//         const decksData = response.data;

//         // Fetch cards for each deck
//         const decksWithCards = await Promise.all(
//           decksData.map(async (deck) => {
//             const cardsResponse = await axios.get(`/api/decks/${deck.id}`);
//             const cards = cardsResponse.data.Cards;
//             return { ...deck, Cards: cards };
//           })
//         );

//         setDecks(decksWithCards);
//       } catch (error) {
//         console.error('Error fetching public decks:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDecks();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="community-hub">
//       <h2>Community Hub</h2>
//       <div className="deck-list">
//         {decks.length > 0 ? (
//           decks.map((deck) => (
//             <div key={deck.id} className="deck-card">
//               <Link to={`/community/${deck.id}`}>
//                 {deck.Cards && deck.Cards.length > 0 ? (
//                   <div className="deck-card-image">
//                   <img
//                     src={deck.Cards[0].image_url}
//                     alt={deck.name}
//                   />
//                 </div>
//                 ) : (
//                   <div className="no-image">No Image Available</div>
//                 )}
//                 <div className="deck-info">
//                   <h3>{deck.name}</h3>
//                   <p>Owner: {deck.user.username}</p>
//                 </div>
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p>No public decks available</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CommunityHubPage;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CommunityHubPage.css';
// import { Link } from 'react-router-dom';

// function CommunityHubPage() {
//   const [decks, setDecks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDecks = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('/api/decks');
//         const decksData = response.data;

//         // Fetch cards for each deck
//         const decksWithCards = await Promise.all(
//           decksData.map(async (deck) => {
//             const cardsResponse = await axios.get(`/api/decks/${deck.id}`);
//             const cards = cardsResponse.data.Cards;
//             return { ...deck, Cards: cards };
//           })
//         );

//         setDecks(decksWithCards);
//       } catch (error) {
//         console.error('Error fetching public decks:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDecks();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="community-hub">
//       <h2>Community Hub</h2>
//       <div className="deck-list">
//         {decks.length > 0 ? (
//           decks.map((deck) => (
//             <div key={deck.id} className="deck-card">
//               <Link to={`/community/${deck.id}`}>
//                 {deck.Cards && deck.Cards.length > 0 ? (
//                   <div className="deck-card-image">
//                     <img
//                       src={deck.Cards[0].image_url}
//                       alt={deck.name}
//                       className="artwork-image"
//                     />
//                   </div>
//                 ) : (
//                   <div className="no-image">No Image Available</div>
//                 )}
//                 <div className="deck-info">
//                   <h3>{deck.name}</h3>
//                   <p>Owner: {deck.user.username}</p>
//                 </div>
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p>No public decks available</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CommunityHubPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommunityHubPage.css';
import { Link } from 'react-router-dom';

function CommunityHubPage() {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/decks');
        const decksData = response.data;

        // Fetch cards for each deck
        const decksWithCards = await Promise.all(
          decksData.map(async (deck) => {
            const cardsResponse = await axios.get(`/api/decks/${deck.id}`);
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

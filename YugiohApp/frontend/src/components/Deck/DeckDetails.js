// //to look at other users deck details
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function DeckDetails() {
//   const { deckId } = useParams();
//   const [deck, setDeck] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDeckDetails = async () => {
//       try {
//         const response = await axios.get(`/api/decks/${deckId}`);
//         setDeck(response.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching deck details:', error);
//         setError('Failed to load deck details');
//         setIsLoading(false);
//       }
//     };

//     fetchDeckDetails();
//   }, [deckId]);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h1>{deck.name}</h1>
//       <p><strong>Notes:</strong> {deck.description || 'No notes available'}</p>
//       <table>
//         <thead>
//           <tr>
//             <th>Card Name</th>
//             <th>Image</th>
//             <th>Count</th>
//           </tr>
//         </thead>
//         <tbody>
//           {deck.Cards.map((card) => (
//             <tr key={card.id}>
//               <td>{card.name}</td>
//               <td><img src={card.image_url} alt={card.name} width="100" /></td>
//               <td>{card.DeckCard.count}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default DeckDetails;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useAuth } from '../../pages/AuthContext';

// function DeckDetails() {
//   const { deckId } = useParams();
//   const [deck, setDeck] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const {getUserId} = useAuth(); 

//   useEffect(() => {
//     const fetchDeckDetails = async () => {
//       try {
//         const response = await axios.get(`/api/decks/${deckId}`);
//         setDeck(response.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching deck details:', error);
//         setError('Failed to load deck details');
//         setIsLoading(false);
//       }
//     };

//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(`/api/decks/${deckId}/comments`);
//         setComments(response.data);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };

//     fetchDeckDetails();
//     fetchComments();
//   }, [deckId]);

//   const editComment = async (commentId, newContent) => {
//     try {
//       const response = await axios.put(`/api/comments/${commentId}`, { content: newContent });
//       setComments(comments.map(comment => 
//         comment.id === commentId ? response.data : comment
//       ));
//     } catch (error) {
//       console.error('Error editing comment:', error);
//     }
//   };
  
//   const deleteComment = async (commentId) => {
//     try {
//       await axios.delete(`/api/comments/${commentId}`);
//       setComments(comments.filter(comment => comment.id !== commentId));
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//     }
//   };
  

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`/api/decks/${deckId}/comments`, { userid: getUserId(), content: newComment });
//       setNewComment('');
//       // Fetch comments again after adding a new one
//       const response = await axios.get(`/api/decks/${deckId}/comments`);
//       setComments(response.data);
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h1>{deck.name}</h1>
//       <p><strong>Notes:</strong> {deck.description || 'No notes available'}</p>
//       <table>
//         <thead>
//           <tr>
//             <th>Card Name</th>
//             <th>Image</th>
//             <th>Count</th>
//           </tr>
//         </thead>
//         <tbody>
//           {deck.Cards.map((card) => (
//             <tr key={card.id}>
//               <td>{card.name}</td>
//               <td><img src={card.image_url} alt={card.name} width="100" /></td>
//               <td>{card.DeckCard.count}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div>
//         <h2>Comments</h2>
//         <ul>
//           {comments.map((comment) => (
//             <li key={comment.id}>
//               <strong>{comment.user.username}</strong>: {comment.content}
//             </li>
//           ))}
//         </ul>
//         <form onSubmit={handleCommentSubmit}>
//           <textarea
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             placeholder="Add a comment..."
//             required
//           />
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default DeckDetails;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../pages/AuthContext';
import { getImageUrl } from '../../utils/util';
import './DeckDetails.css';

function DeckDetails() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState('');
  const { getUserId } = useAuth();
  

  useEffect(() => {
    const fetchDeckDetails = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const response = await axios.get(`/api/decks/${deckId}`);
        setDeck(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching deck details:', error);
        setError('Failed to load deck details');
        setIsLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/decks/${deckId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchDeckDetails();
    fetchComments();
  }, [deckId]);

  const handleEditComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditingCommentContent(content);
  };

  const handleSaveEditedComment = async () => {
    try {
      const response = await axios.put(`/api/comments/${editingCommentId}`, { userid:getUserId(), content: editingCommentContent });
      setComments(comments.map(comment =>
        comment.id === editingCommentId ? response.data : comment
      ));
      setEditingCommentId(null);
      setEditingCommentContent('');
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`,{ params: {userid:getUserId()} });
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/decks/${deckId}/comments`, { userid:getUserId(), content: newComment });
      setNewComment('');
      const response = await axios.get(`/api/decks/${deckId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

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
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {deck.Cards.map((card) => (
            <tr key={card.id}>
              <td>{card.name}</td>
              {/* <td><img src={card.image_url} alt={card.name} width="100" /></td> */}
              <td><img src={card.image_url}  alt={card.name} width="100" /></td>
              <td>{card.DeckCard.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Comments</h2>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <strong>{comment.user ? comment.user.username : 'Unknown User'}</strong>: 
              {editingCommentId === comment.id ? (
                <>
                  <textarea
                    value={editingCommentContent}
                    onChange={(e) => setEditingCommentContent(e.target.value)}
                  />
                  <button onClick={handleSaveEditedComment}>Save</button>
                  <button onClick={() => setEditingCommentId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {comment.content}
                  {comment.userId === getUserId() && (
                    <>
                      <button onClick={() => handleEditComment(comment.id, comment.content)}>Edit</button>
                      <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                    </>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default DeckDetails;



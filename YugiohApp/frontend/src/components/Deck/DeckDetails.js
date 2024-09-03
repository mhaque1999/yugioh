import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../pages/AuthContext';
import './DeckDetails.css';

function DeckDetails() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState('');
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const { getUserId } = useAuth();

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

    const fetchComments = async () => {
      setCommentsLoading(true);
      try {
        const response = await axios.get(`/api/decks/${deckId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setCommentsLoading(false);
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
    setIsEditingComment(true); 
    try {
      const response = await axios.put(`/api/comments/${editingCommentId}`, { userid: getUserId(), content: editingCommentContent });
      setComments(comments.map(comment =>
        comment.id === editingCommentId ? response.data : comment
      ));
      setEditingCommentId(null);
      setEditingCommentContent('');
    } catch (error) {
      console.error('Error editing comment:', error);
    } finally {
      setIsEditingComment(false); 
    }
  };

  const handleDeleteComment = async (commentId) => {
    setDeletingCommentId(commentId);
    try {
      await axios.delete(`/api/comments/${commentId}`, { params: { userid: getUserId() } });
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    } finally {
      setDeletingCommentId(null);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setIsCommentSubmitting(true);
    try {
      await axios.post(`/api/decks/${deckId}/comments`, { userid: getUserId(), content: newComment });
      setNewComment('');
      const response = await axios.get(`/api/decks/${deckId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsCommentSubmitting(false); // Stop loading after adding
    }
  };

  if (isLoading) return <p className="loading-message">Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="deck-details">
      
      <h1 className="deck-title">{deck.name}</h1>
      <p><strong>Notes:</strong> {deck.description || 'No notes available'}</p>
      <table className="card-table">
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
              <td><img src={card.image_url} alt={card.name} width="100" /></td>
              <td>{card.DeckCard.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="comments-section">
        <h2>Comments</h2>
        {commentsLoading ? (
          <p>Loading comments...</p>
        ) : (
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={comment.id} className="comment-item">
                <div className="comment-header">
                  <strong>{comment.user ? comment.user.username : 'Unknown User'}</strong>
                  <div className="comment-actions">
                    {comment.userId === getUserId() && (
                      <>
                        {deletingCommentId === comment.id ? (
                          <p>Loading...</p>
                        ) : (
                          <>
                            <button onClick={() => handleEditComment(comment.id, comment.content)}>
                              {editingCommentId === comment.id ? 'Editing...' : 'Edit'}
                            </button>
                            <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {editingCommentId === comment.id ? (
                  <div className="comment-edit">
                    <textarea
                      value={editingCommentContent}
                      onChange={(e) => setEditingCommentContent(e.target.value)}
                      placeholder="Edit your comment..."
                    />
                    <div className="comment-edit-actions">
                      <button onClick={handleSaveEditedComment} disabled={isEditingComment}>
                        {isEditingComment ? 'Saving...' : 'Save'}
                      </button>
                      <button onClick={() => setEditingCommentId(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <p>{comment.content}</p>
                )}
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            required
          />
          <button type="submit">
            {isCommentSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeckDetails;

const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const { ensureCorrectUser, ensureLoggedIn } = require('../middleware/authenticate'); //realized later that i should be doing this to only allow for authorized users.
 
// router.get('/decks/:id/comments', ensureLoggedIn, commentsController.getCommentsForDeck);
// router.post('/:userId/decks/:id/comments', ensureCorrectUser,commentsController.addComment);
// router.put('/:userId/comments/:commentId',  ensureCorrectUser, commentsController.editComment);
// router.delete('/:userId/comments/:commentId', ensureCorrectUser, commentsController.deleteComment);

// Get all comments for a specific deck - any logged-in user can access
router.get('/decks/:id/comments', ensureLoggedIn, commentsController.getCommentsForDeck);

// Add a comment to a specific deck - ensure correct user by userId
router.post('/:userId/decks/:id/comments', ensureCorrectUser, commentsController.addComment);

// Edit a specific comment - ensure correct user by userId
router.put('/:userId/comments/:commentId', ensureCorrectUser, commentsController.editComment);

// Delete a specific comment - ensure correct user by userId
router.delete('/:userId/comments/:commentId', ensureCorrectUser, commentsController.deleteComment);

module.exports = router;

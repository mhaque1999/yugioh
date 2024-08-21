const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const { authenticate } = require('../middleware/authenticate'); //realized later that i should be doing this to only allow for authorized users.
 
router.get('/decks/:id/comments', commentsController.getCommentsForDeck);
router.post('/decks/:id/comments', commentsController.addComment);
router.put('/comments/:commentId',  commentsController.editComment);
router.delete('/comments/:commentId', commentsController.deleteComment);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const apiLimiter = require('../middleware/rateLimit');
// const cardController = require('../controllers/cardController');
// const { ensureCorrectUser, ensureCorrectUserOrPublicDeck, ensureLoggedIn } = require('../middleware/authenticate');


// //router.get('/', apiLimiter, cardController.getAllCards);
// router.get('/', [apiLimiter,ensureLoggedIn], cardController.getAllCardsFromTable);
// router.get('/:name', [apiLimiter,ensureLoggedIn], cardController.getCardById);
// //router.put('/:id', apiLimiter, cardController.updateCard);
// //router.delete('/:id', cardController.deleteCard);
// router.post('/:deckId/add', [apiLimiter,ensureCorrectUser], cardController.addCardsToDeck);
// router.delete('/:deckId/delete', [apiLimiter,ensureCorrectUser], cardController.removeCardFromDeck);

// module.exports = router;
const express = require('express');
const router = express.Router();
const apiLimiter = require('../middleware/rateLimit');
const cardController = require('../controllers/cardController');
const { ensureCorrectUser, ensureCorrectUserOrPublicDeck, ensureLoggedIn } = require('../middleware/authenticate');



// router.get('/', [apiLimiter,ensureLoggedIn], cardController.getAllCardsFromTable);
// router.get('/:name', [apiLimiter,ensureLoggedIn], cardController.getCardById);
// router.post('/:userId/decks/:deckId/add', [apiLimiter,ensureCorrectUser], cardController.addCardsToDeck);
// router.delete('/:userId/decks/:deckId/delete', [apiLimiter,ensureCorrectUser], cardController.removeCardFromDeck);

// Get all cards - any logged-in user can access
router.get('/', apiLimiter, ensureLoggedIn, cardController.getAllCardsFromTable);

// Get a specific card by name - any logged-in user can access
router.get('/:name', apiLimiter, ensureLoggedIn, cardController.getCardById);

// Add cards to a deck - ensure correct user by userId
router.post('/:userId/decks/:deckId/add', apiLimiter, ensureCorrectUser, cardController.addCardsToDeck);

// Remove a card from a deck - ensure correct user by userId
router.delete('/:userId/decks/:deckId/delete', apiLimiter, ensureCorrectUser, cardController.removeCardFromDeck);

module.exports = router;

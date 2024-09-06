// const express = require('express');
// const router = express.Router();
// const deckController = require('../controllers/deckController');
// const { ensureCorrectUser, ensureLoggedIn, ensureCorrectUserOrPublicDeck } = require('../middleware/authenticate');

// router.get('/', ensureLoggedIn, deckController.getAllDecks); //edit so that i put userid in param for some routes
// router.post('/userdecks', ensureLoggedIn,deckController.getUserDecks);
// router.get('/:id', ensureCorrectUserOrPublicDeck,deckController.getDeckById);
// router.post('/', ensureLoggedIn,deckController.createDeck);
// router.put('/:id', ensureCorrectUserOrPublicDeck,deckController.updateDeck);
// router.delete('/:id', ensureCorrectUserOrPublicDeck,deckController.deleteDeck);
// router.delete('/removecards/:id', ensureCorrectUserOrPublicDeck,deckController.deleteCardsFromDeck)
// router.put('/visibility/:id', ensureCorrectUserOrPublicDeck,deckController.updateVisibility)

// module.exports = router;

const express = require('express');
const router = express.Router();
const deckController = require('../controllers/deckController');
const { ensureCorrectUser, ensureLoggedIn, ensureCorrectUserOrPublicDeck } = require('../middleware/authenticate');

// Get all decks for logged-in users
router.get('/', ensureLoggedIn, deckController.getAllDecks);

// Get decks for a specific user
router.post('/userdecks', ensureLoggedIn, deckController.getUserDecks);

// Get a specific deck by ID (user-specific or public)
router.get('/:id', ensureCorrectUserOrPublicDeck, deckController.getDeckById);

// Create a new deck (logged-in users)
router.post('/', ensureLoggedIn, deckController.createDeck);

// Update a specific deck by ID (ensure user ownership)
router.put('/:id/:userId', ensureCorrectUser, deckController.updateDeck);

// Delete a specific deck by ID (ensure user ownership)
router.delete('/:id/:userId', ensureCorrectUser, deckController.deleteDeck);

// Remove cards from a specific deck (ensure user ownership)
router.delete('/removecards/:id/:userId', ensureCorrectUser, deckController.deleteCardsFromDeck);

// Update the visibility of a specific deck (ensure user ownership)
router.put('/visibility/:id/:userId', ensureCorrectUser, deckController.updateVisibility);

module.exports = router;
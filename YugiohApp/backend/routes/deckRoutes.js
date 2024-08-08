const express = require('express');
const router = express.Router();
const deckController = require('../controllers/deckController');

router.get('/', deckController.getAllDecks);
router.post('/userdecks', deckController.getUserDecks);
router.get('/:id', deckController.getDeckById);
router.post('/', deckController.createDeck);
router.put('/:id', deckController.updateDeck);
router.delete('/:id', deckController.deleteDeck);
router.delete('/removecards/:id', deckController.deleteCardsFromDeck)
router.put('/visibility/:id', deckController.updateVisibility)

module.exports = router;

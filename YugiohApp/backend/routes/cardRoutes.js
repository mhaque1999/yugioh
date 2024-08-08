const express = require('express');
const router = express.Router();
const apiLimiter = require('../middleware/rateLimit');
const cardController = require('../controllers/cardController');


router.get('/', apiLimiter, cardController.getAllCards);
router.get('/:name', apiLimiter, cardController.getCardById);
//router.post('/', apiLimiter, cardController.createCard);
//router.put('/:id', apiLimiter, cardController.updateCard);
//router.delete('/:id', cardController.deleteCard);
router.post('/:deckId/add', apiLimiter, cardController.addCardsToDeck);
router.delete('/:deckId/delete', apiLimiter, cardController.removeCardFromDeck);

module.exports = router;

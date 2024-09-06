const Deck = require('../models/Deck');
const Card = require('../models/Card');
const DeckCard = require('../models/DeckCard');
const User = require('../models/User');
const { Op } = require('sequelize');
const sequelize = require('../database/db');
const cache = require('../middleware/cache');

async function getAllDecks(req, res) {
  try {
    const decks = await Deck.findAll({
      where: { public: true },
      include: [{ model: User, as:'user', attributes: ['username'] }],
    });
    console.log("this is the community decks:",decks)
    res.json(decks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserDecks(req, res){ //change
  try {
    const userId = res.locals.user.userId;

    const userDecks = await Deck.findAll({ where: { user_id: userId } });
    
    console.log("the userdecks from the deck controller is:",userDecks)

    res.json(userDecks);
  } 
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getDeckById(req, res) { 
  try {
    const { id } = req.params;
  
    const deck = await Deck.findOne({
      where: { id: id },
      include: [
        {
          model: Card,
          through: {
            model: DeckCard,
            attributes: ['count'], // Include count from DeckCard
          },
          attributes: ['id', 'name', 'image_url'],
        }
      ],
    });
    console.log(deck.Cards);
    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    res.json(deck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function createDeck(req, res) { //change 
  try {
    const { name } = req.body; 
    const userId = res.locals.user.userId;
    const newDeck = await Deck.create({ name, userId });

    // Clear allDecks cache after creating new deck
    await cache.del('allDecks');

    res.status(201).json(newDeck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateDeck(req, res) {
  try {
    const { id } = req.params;
    const { name, isPublic } = req.body;
    console.log('Received deck ID:', id);
    console.log("this public value from deckcontroller:", isPublic);
    const deck = await Deck.findByPk(id);
    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    await deck.update({ name:name, public:isPublic });
  
    res.json(deck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteDeck(req, res) {
  try {
    const { id } = req.params;
    const deck = await Deck.findByPk(id);
    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    await deck.destroy();

    // Clear deck cache after deleting
    await cache.del(`deck_${id}`);

    // Clear allDecks cache after deleting
    await cache.del('allDecks');

    res.json({ message: 'Deck deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteCardsFromDeck(req, res)  {
  try {
    const { id } = req.params;

    // Remove all cards associated with the deck
    await DeckCard.destroy({ where: { deck_id: id } });

    res.status(200).json({ message: 'All cards removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function updateVisibility(req, res){
  try {
    const { id } = req.params;
    const { public } = req.body; 

    const [updated] = await Deck.update({ public }, { where: { id: id } });
    
    if (updated) {
      const updatedDeck = await Deck.findByPk(deckId);
      return res.status(200).json(updatedDeck);
    }

    throw new Error('Deck not found');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllDecks,
  getUserDecks,
  getDeckById,
  createDeck,
  updateDeck,
  deleteDeck,
  deleteCardsFromDeck,
  updateVisibility
};


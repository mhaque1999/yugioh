const Deck = require('../models/Deck');
const Card = require('../models/Card');
const DeckCard = require('../models/DeckCard');
const User = require('../models/User');
const { Op } = require('sequelize');
const sequelize = require('../database/db');
const cache = require('../middleware/cache');

async function getAllDecks(req, res) {
  try {
    // Check if decks data is cached
    // const cachedDecks = await cache.get('allDecks');
    // if (cachedDecks) {
    //   return res.json(JSON.parse(cachedDecks));
    // }

    const decks = await Deck.findAll({
      where: { public: true },
      include: [{ model: User, as:'user', attributes: ['username'] }],
    });
    console.log("this is the community decks:",decks)
    // Cache decks data for 2 days (172800 seconds)
    // await cache.set('allDecks', JSON.stringify(decks), 172800);

    res.json(decks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserDecks(req, res){
  try {
    const { userId } = req.body;

    // const cachedUserDecks = await cache.get(`userDecks_${userId}`);
    // if (cachedUserDecks) {
    //   return res.json(JSON.parse(cachedUserDecks));
    // }
    
    const userDecks = await Deck.findAll({ where: { user_id: userId } });
    
    console.log("the userdecks from the deck controller is:",userDecks)
    // await cache.set(`userDecks_${userId}`, JSON.stringify(userDecks), 172800);

    res.json(userDecks);
  } 
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getDeckById(req, res) {
  try {
    const { id } = req.params;

    // Check if deck data is cached
    const cachedDeck = await cache.get(`deck_${id}`);
    if (cachedDeck) {
      return res.json(JSON.parse(cachedDeck));
    }
    
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

    // Cache deck data for 2 days (172800 seconds)
    //await cache.set(`deck_${id}`, JSON.stringify(deck), 172800);

    res.json(deck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function createDeck(req, res) {
  try {
    const { name, userId } = req.body;
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
    console.log("this public value from deckcontroller:", isPublic);
    const deck = await Deck.findByPk(id);
    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    await deck.update({ name:name, public:isPublic });
    //await deck.update({ })

    // Clear deck cache after updating
    await cache.del(`deck_${id}`);

    // Clear allDecks cache after updating
    await cache.del('allDecks');

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
    const { deckId } = req.params;
    const { public } = req.body; 

    const [updated] = await Deck.update({ public }, { where: { id: deckId } });
    
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


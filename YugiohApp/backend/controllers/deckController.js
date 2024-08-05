const Deck = require('../models/Deck');
const Card = require('../models/Card');
const DeckCard = require('../models/DeckCard');
const { Op } = require('sequelize');
const sequelize = require('../database/db');
const cache = require('../middleware/cache');

async function getAllDecks(req, res) {
  try {
    // Check if decks data is cached
    const cachedDecks = await cache.get('allDecks');
    if (cachedDecks) {
      return res.json(JSON.parse(cachedDecks));
    }

    const decks = await Deck.findAll();

    // Cache decks data for 2 days (172800 seconds)
    await cache.set('allDecks', JSON.stringify(decks), 172800);

    res.json(decks);
  } catch (error) {
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
            attributes: ['count'],
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
    await cache.set(`deck_${id}`, JSON.stringify(deck), 172800);

    res.json(deck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createDeck(req, res) {
  try {
    const { name } = req.body;
    const newDeck = await Deck.create({ name });

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
    const { name } = req.body;
    const deck = await Deck.findByPk(id);
    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    await deck.update({ name });
    await deck.update({ })

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

module.exports = {
  getAllDecks,
  getDeckById,
  createDeck,
  updateDeck,
  deleteDeck
};


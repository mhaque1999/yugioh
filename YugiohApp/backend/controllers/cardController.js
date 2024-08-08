const axios = require('axios');
const { Op } = require('sequelize');
const  sequelize  = require('../database/db');
const Card = require('../models/Card');
const Deck = require('../models/Deck');
const DeckCard = require('../models/DeckCard');
const cache = require('../middleware/cache');
const YGOPRO_API_BASE_URL = 'https://db.ygoprodeck.com/api/v7';

async function fetchAllCardDataFromAPI() {
  try {
    const response = await axios.get(`${YGOPRO_API_BASE_URL}/cardinfo.php`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching card data from API:', error);
    throw error;
  }
}

async function fetchCardDataFromAPI(params) {
  try {
    const response = await axios.get(`${YGOPRO_API_BASE_URL}/cardinfo.php`, {
      params: params,
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching card data from API:', error);
    throw error;
  }
}

function handleError(res, error, message = 'Server error') {
  console.error(error);
  if (res && res.status) {
    res.status(500).json({ message });
  } else {
    console.error('Response object is invalid.');
  }
}

async function fetchAndStoreAllCards(req, res) {
  try {
    const cardData = await fetchAllCardDataFromAPI();
    const storedCards = [];

    for (const apiCardData of cardData) {
      let card = await Card.findOne({ where: { name: apiCardData.name } });

      if (!card) {
        card = await Card.upsert({
          id: apiCardData.id,
          name: apiCardData.name,
          desc: apiCardData.desc,
          atk: apiCardData.atk || null,
          def: apiCardData.def || null,
          type: apiCardData.type,
          frameType: apiCardData.frameType || null,
          level: apiCardData.level || null,
          race: apiCardData.race,
          attribute: apiCardData.attribute || null,
          linkval: apiCardData.linkval || null,
          linkmarkers: apiCardData.linkmarkers || null,
          archetype: apiCardData.archetype,
          set_tag: apiCardData.set_tag || null,
          setcode: apiCardData.setcode || null,
          ban_tcg: apiCardData.ban_tcg || null,
          ban_ocg: apiCardData.ban_ocg || null,
          ban_goat: apiCardData.ban_goat || null,
          image_url: apiCardData.card_images[0].image_url,
          image_url_small: apiCardData.card_images[0].image_url_small,
          cardmarket_price: apiCardData.card_prices[0].cardmarket_price || null,
          tcgplayer_price: apiCardData.card_prices[0].tcgplayer_price || null,
          ebay_price: apiCardData.card_prices[0].ebay_price || null,
          amazon_price: apiCardData.card_prices[0].amazon_price || null,
          coolstuffinc_price: apiCardData.card_prices[0].coolstuffinc_price || null,
        });
      } else {
        // Update existing card if necessary
        card.name = apiCardData.name;
        card.desc = apiCardData.desc;
        card.atk = apiCardData.atk || null;
        card.def = apiCardData.def || null;
        card.type = apiCardData.type;
        card.frameType = apiCardData.frameType || null;
        card.level = apiCardData.level || null;
        card.race = apiCardData.race;
        card.attribute = apiCardData.attribute || null;
        card.linkval = apiCardData.linkval || null;
        card.linkmarkers = apiCardData.linkmarkers || null;
        card.archetype = apiCardData.archetype;
        card.set_tag = apiCardData.set_tag || null;
        card.setcode = apiCardData.setcode || null;
        card.ban_tcg = apiCardData.ban_tcg || null;
        card.ban_ocg = apiCardData.ban_ocg || null;
        card.ban_goat = apiCardData.ban_goat || null;
        card.image_url = apiCardData.card_images[0].image_url;
        card.image_url_small = apiCardData.card_images[0].image_url_small;
        card.cardmarket_price = apiCardData.card_prices[0].cardmarket_price || null;
        card.tcgplayer_price = apiCardData.card_prices[0].tcgplayer_price || null;
        card.ebay_price = apiCardData.card_prices[0].ebay_price || null;
        card.amazon_price = apiCardData.card_prices[0].amazon_price || null;
        card.coolstuffinc_price = apiCardData.card_prices[0].coolstuffinc_price || null;


        await card.save();
      }
      storedCards.push(card);
    }

    cache.set('all_cards', storedCards);
    res.status(201).json(storedCards);
  } catch (error) {
    console.error('Error in fetchAndStoreAllCards:', error);
    handleError(res, error);
  }
}

async function getAllCards(req, res) {
  try {
    const cachedData = cache.get('all_cards');
    if (cachedData) {
      return res.json(cachedData); // Return cached data immediately
    }

    const storedCards = await fetchAndStoreAllCards(req, res);

    // Cache the fetched cards
    cache.set('all_cards', storedCards);

    // Send the fetched cards as response
    res.json(storedCards);
  } catch (error) {
    handleError(res, error);
  }
}

async function getCardById(req, res) {
  const { name } = req.params;
  console.log(name);

  try {
    const cachedCard = cache.get(`card_${name}`);
    if (cachedCard) {
      return res.json(cachedCard);
    }

    const card = await Card.findAll({
      where: {
        name: name
      }
    });

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    cache.set(`card_${name}`, card);
    res.json(card);
  } catch (error) {
    handleError(res, error);
  }
}

async function createCard(req, res) {
  const { name } = req.body;

  try {
    const params = { name };
    const cardData = await fetchCardDataFromAPI(params);
    const apiCardData = cardData[0];

    let card = await Card.findOne({ where: { name: apiCardData.name } });

    if (!card) {
      card = await Card.create({
        name: apiCardData.name,
        desc: apiCardData.desc,
        atk: apiCardData.atk,
        def: apiCardData.def,
        type: apiCardData.type,
        level: apiCardData.level,
        race: apiCardData.race,
        attribute: apiCardData.attribute,
        linkval: apiCardData.linkval,
        linkmarkers: apiCardData.linkmarkers,
        archetype: apiCardData.archetype,
        set_tag: apiCardData.set_tag,
        setcode: apiCardData.setcode,
        ban_tcg: apiCardData.ban_tcg,
        ban_ocg: apiCardData.ban_ocg,
        ban_goat: apiCardData.ban_goat,
        image_url: apiCardData.image_url,
        image_url_small: apiCardData.image_url_small,
      });
    } else {
      card.desc = apiCardData.desc;
      card.atk = apiCardData.atk;
      card.def = apiCardData.def;
      card.type = apiCardData.type;
      card.level = apiCardData.level;
      card.race = apiCardData.race;
      card.attribute = apiCardData.attribute;
      card.linkval = apiCardData.linkval;
      card.linkmarkers = apiCardData.linkmarkers;
      card.archetype = apiCardData.archetype;
      card.set_tag = apiCardData.set_tag;
      card.setcode = apiCardData.setcode;
      card.ban_tcg = apiCardData.ban_tcg;
      card.ban_ocg = apiCardData.ban_ocg;
      card.ban_goat = apiCardData.ban_goat;
      card.image_url = apiCardData.image_url;
      card.image_url_small = apiCardData.image_url_small;

      await card.save();
    }

    cache.del('all_cards');
    res.status(201).json(card);
  } catch (error) {
    handleError(res, error);
  }
}

async function updateCard(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const params = { name };
    const cardData = await fetchCardDataFromAPI(params);
    const apiCardData = cardData[0];

    const card = await Card.findByPk(id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    card.name = apiCardData.name;
    card.desc = apiCardData.desc;
    card.atk = apiCardData.atk;
    card.def = apiCardData.def;
    card.type = apiCardData.type;
    card.level = apiCardData.level;
    card.race = apiCardData.race;
    card.attribute = apiCardData.attribute;
    card.linkval = apiCardData.linkval;
    card.linkmarkers = apiCardData.linkmarkers;
    card.archetype = apiCardData.archetype;
    card.set_tag = apiCardData.set_tag;
    card.setcode = apiCardData.setcode;
    card.ban_tcg = apiCardData.ban_tcg;
    card.ban_ocg = apiCardData.ban_ocg;
    card.ban_goat = apiCardData.ban_goat;
    card.image_url = apiCardData.image_url;
    card.image_url_small = apiCardData.image_url_small;

    await card.save();
    cache.del(`card_${id}`);
    cache.del('all_cards');
    res.json(card);
  } catch (error) {
    handleError(res, error);
  }
}

async function deleteCard(req, res) {
  const { id } = req.params;

  try {
    const card = await Card.findByPk(id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    await card.destroy();
    cache.del(`card_${id}`);
    cache.del('all_cards');
    res.status(204).end();
  } catch (error) {
    handleError(res, error);
  }
}


async function addCardsToDeck(req, res) {
  const { deckId } = req.params;
  const { cardIds } = req.body;
  console.log('Request Data:', { deckId, cardIds });

  if (!deckId || !Array.isArray(cardIds) || cardIds.length === 0) {
    return res.status(400).json({ error: 'Invalid deck ID or card IDs' });
  }

  try {
    const result = await sequelize.transaction(async (transaction) => {
      // Get the current count of each card in the deck
      const cardCounts = await DeckCard.findAll({
        attributes: [
          ['card_id', 'cardId'],  // Alias for result set
          [sequelize.fn('COUNT', sequelize.col('card_id')), 'count']  // Use actual column name
        ],
        where: { deck_id: deckId },
        group: ['card_id'],  // Group by actual column name
        transaction
      });

      console.log('Current Card Counts:', cardCounts);

      const cardCountMap = cardCounts.reduce((map, { card_id, count }) => {  // Use card_id
        map[card_id] = count;
        return map;
      }, {});

      const validCardEntries = [];
      const invalidCardIds = [];

      console.log("Starting card processing...");
      console.log("deckId:", deckId);
      console.log("cardIds:", cardIds);
      console.log("cardCountMap:", JSON.stringify(cardCountMap, null, 2));
      // Prepare entries to add
      for (let cardId of cardIds) {
        let {id, count} = cardId
        const existingCount = cardCountMap[cardId] || 0;
        const newCount = existingCount + 1;

        console.log(`Processing cardId: ${cardId}, existingCount: ${existingCount}, newCount: ${newCount}`);
        console.log(cardId, "count is ", newCount)
        if (newCount <= 3) {
          validCardEntries.push({ deckId, cardId:id, count:count });  // Use deck_id and card_id
        } else {
          invalidCardIds.push(id);
        }
      }
      console.log("Processed validCardEntries:", JSON.stringify(validCardEntries, null, 2));

      // Remove existing cards to avoid duplication
      if (validCardEntries.length > 0) {
        console.log('Removing existing cards...');
        await DeckCard.destroy({
          where: {
            deck_id: deckId,  // Correct column name
            card_id: validCardEntries.map(entry => entry.card_id)  // Correct column name
          },
          transaction
        });
      }

      
      // Add new valid cards
      if (validCardEntries.length > 0) {
        console.log("hello?")
        console.log("the valid cards are", validCardEntries);
        console.log('Adding new cards...');
        await DeckCard.bulkCreate(validCardEntries, { transaction });
      }

      // Fetch the updated deck
      const updatedDeck = await Deck.findByPk(deckId, {
        include: [
          {
            model: Card,
            through: { attributes: [] },
            attributes: ['id', 'name'],
          }
        ],
        transaction
      });

      return { updatedDeck, invalidCardIds };
    });

    // Handle cache invalidation
    await cache.del(`deck_${deckId}`);

    const { updatedDeck, invalidCardIds } = result;

    if (invalidCardIds.length > 0) {
      return res.status(400).json({
        message: 'Some cards were not added due to exceeding the limit of 3 copies per deck.',
        invalidCardIds
      });
    }

    res.status(201).json({ message: 'Cards added to deck successfully', deck: updatedDeck });
  } catch (error) {
    console.error('Error in addCardsToDeck:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error in addCardsToDeck:', error);
    handleError(res, error);
  }
}



async function addCardToDeck(req, res) {
  const { deckId } = req.params;
  const { cardId } = req.body;

  try {
    // Check the current count of the card in the deck
    const existingCardCount = await DeckCard.count({
      where: {
        deckId,
        cardId
      }
    });

    if (existingCardCount >= 3) {
      return res.status(400).json({ message: 'Cannot add more than 3 copies of a card to a deck.' });
    }

    // Create the DeckCard entry if the limit is not reached
    const deckCard = await DeckCard.create({
      deckId,
      cardId,
    });

    // Fetch the updated deck to include the newly added card
    const updatedDeck = await Deck.findByPk(deckId, {
      include: [
        {
          model: Card,
          through: { attributes: [] }, // Exclude join table attributes
          attributes: ['id', 'name'], // Select specific attributes of Card
        }
      ],
    });

    await cache.del(`deck_${deckId}`);
    
    res.status(201).json({ message: 'Card added to deck successfully', deck: updatedDeck });
  } catch (error) {
    handleError(res, error);
  }
}


async function removeCardFromDeck(req, res) {
  const { deckId } = req.params;
  const { cardId } = req.body;

  try {
    // Find the DeckCard entry to delete
    const deckCard = await DeckCard.findOne({
      where: {
        deckId,
        cardId
      }
    });
    

    if (!deckCard) {
      return res.status(404).json({ error: 'DeckCard entry not found' });
    }

    // Delete the DeckCard entry
    await deckCard.destroy();

    const updatedDeck = await Deck.findByPk(deckId, {
      include: [
        {
          model: Card,
          through: { attributes: [] }, // Exclude join table attributes
          attributes: ['id', 'name'], // Select specific attributes of Card
        }
      ],
    });

    await cache.del(`deck_${deckId}`);
    
    res.json({ message: 'Card removed from deck successfully', deck: updatedDeck });
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
  fetchAndStoreAllCards,
  addCardToDeck,
  addCardsToDeck,
  removeCardFromDeck
};

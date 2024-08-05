const axios = require('axios');
const { Card } = require('../models/Card'); 

const API_URL = 'https://db.ygoprodeck.com/api/v7';

async function fetchCardsFromAPI() {
  try {
    const response = await axios.get(`${API_URL}/cardinfo.php`);
    console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.error('Error fetching cards from API:', error);
    throw error;
  }
}

async function syncCardsWithAPI() {
  try {
    const cards = await fetchCardsFromAPI();
    await Card.bulkCreate(cards, { ignoreDuplicates: true });
    console.log('Cards synchronized with API successfully.');
  } catch (error) {
    console.error('Error syncing cards with API:', error);
    throw error;
  }
}

async function getAllCards() {
  try {
    const cards = await Card.findAll();
    return cards;
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw error;
  }
}

async function getCardById(id) {
  try {
    const card = await Card.findByPk(id);
    if (!card) {
      throw new Error('Card not found.');
    }
    return card;
  } catch (error) {
    console.error(`Error fetching card with ID ${id}:`, error);
    throw error;
  }
}

async function createCard(cardData) {
  try {
    const newCard = await Card.create(cardData);
    return newCard;
  } catch (error) {
    console.error('Error creating card:', error);
    throw error;
  }
}

async function updateCard(id, cardData) {
  try {
    const card = await Card.findByPk(id);
    if (!card) {
      throw new Error('Card not found.');
    }
    await card.update(cardData);
    return card;
  } catch (error) {
    console.error(`Error updating card with ID ${id}:`, error);
    throw error;
  }
}

async function deleteCard(id) {
  try {
    const card = await Card.findByPk(id);
    if (!card) {
      throw new Error('Card not found.');
    }
    await card.destroy();
    return true;
  } catch (error) {
    console.error(`Error deleting card with ID ${id}:`, error);
    throw error;
  }
}

async function addCardToDeck(deckId, cardId) {
  throw new Error('Method not implemented.');
}

module.exports = {
  syncCardsWithAPI,
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
  addCardToDeck,
};

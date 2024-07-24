'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Deck = require('./Deck'); 
const Card = require('./Card');

class DeckCard extends Model {
  static associate(models) {
    this.belongsTo(models.Deck, { foreignKey: 'deckId' });
    this.belongsTo(models.Card, { foreignKey: 'cardId' });
  }
}

DeckCard.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  deckId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Decks',
      key: 'id'
    }
  },
  cardId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Cards',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'DeckCard',
  tableName: 'DeckCards'
});

module.exports = DeckCard;

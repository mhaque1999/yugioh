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
    field: 'deck_id',
    references: {
      model: Deck,
      key: 'id'
    }
  },
  cardId: {
    type: DataTypes.INTEGER,
    field: 'card_id',
    references: {
      model: Card,
      key: 'id'
    }
  },
  count: {  
    type: DataTypes.INTEGER,
    defaultValue: 1, 
  }
}, {
  sequelize,
  modelName: 'DeckCard',
  tableName: 'DeckCards'
});

module.exports = DeckCard;

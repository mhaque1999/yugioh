'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Card extends Model {
  static associate(models) {
    this.belongsToMany(models.Deck, {
      through: models.DeckCard,
      foreignKey: 'cardId',
      otherKey: 'deckId'
    });
  }
}
Card.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.TEXT
  },
  atk: {
    type: DataTypes.INTEGER
  },
  def: {
    type: DataTypes.INTEGER
  },
  type: {
    type: DataTypes.STRING
  },
  frameType: {
    type: DataTypes.STRING
  },
  level: {
    type: DataTypes.INTEGER
  },
  race: {
    type: DataTypes.STRING
  },
  attribute: {
    type: DataTypes.STRING
  },
  linkval: {
    type: DataTypes.INTEGER
  },
  linkmarkers: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
  archetype: {
    type: DataTypes.STRING
  },
  set_tag: {
    type: DataTypes.STRING
  },
  setcode: {
    type: DataTypes.STRING
  },
  ban_tcg: {
    type: DataTypes.INTEGER
  },
  ban_ocg: {
    type: DataTypes.INTEGER
  },
  ban_goat: {
    type: DataTypes.INTEGER
  },
  image_url: {
    type: DataTypes.STRING
  },
  image_url_small: {
    type: DataTypes.STRING
  },
  cardmarket_price: {
    type: DataTypes.FLOAT
  },
  tcgplayer_price: {
    type: DataTypes.FLOAT
  },
  ebay_price: {
    type: DataTypes.FLOAT
  },
  amazon_price: {
    type: DataTypes.FLOAT
  },
  coolstuffinc_price: {
    type: DataTypes.FLOAT
  }
}, {
  sequelize,
  modelName: 'Card',
  tableName: 'Cards'
});

module.exports = Card;

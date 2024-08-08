'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');


class Deck extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    this.belongsToMany(models.Card, {
      through: models.DeckCard,
      foreignKey: 'deckId',
      otherKey: 'cardId'
    });
  }
}

Deck.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  deckList: DataTypes.ARRAY(DataTypes.STRING),
  public: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Default to private
  },
  userId: { 
    type: DataTypes.INTEGER,
    //field: 'user_id',
    references: {
      model: 'Users',
      key: 'id'
    },
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Deck',
  tableName: 'Decks'
});

module.exports = Deck;
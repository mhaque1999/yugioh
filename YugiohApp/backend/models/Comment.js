'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Deck = require('./Deck'); 
const User = require('./User');

class Comment extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.belongsTo(models.Deck, { foreignKey: 'deckId', as: 'deck' });
  }
}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  deckId: {
    type: DataTypes.INTEGER,
    field: 'deck_id',
    references: {
      model: Deck,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'Comments'
});

module.exports = Comment;

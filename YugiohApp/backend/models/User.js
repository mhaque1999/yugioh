'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class User extends Model {
  static associate(models) {
    this.hasMany(models.Deck, {
      foreignKey: 'id',
      as: 'decks'
    });
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
}, {
  sequelize,
  modelName: 'User',
  tableName: 'Users'
});

module.exports = User;

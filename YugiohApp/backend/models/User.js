'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const bcrypt = require('bcrypt');

class User extends Model {
  static associate(models) {
    this.hasMany(models.Deck, {
      foreignKey: 'userId',
      as: 'decks'
    });
  }

  async validatePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  // email: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  //   unique: true
  // },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'Users',
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  }
});

module.exports = User;


// models/UploadedImage.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const UploadedImage = sequelize.define('UploadedImage', {
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  photoId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = UploadedImage;

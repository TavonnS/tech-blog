const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Your Sequelize connection

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
  },
  dateCreated: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    reference: {
      model: 'User',
      key: 'username',
    },
  },
  // Add more fields as needed




});

module.exports = Post

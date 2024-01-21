const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); //

const { User } = require('../models');
const { Comment } = require('../models');


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

module.exports = Post;
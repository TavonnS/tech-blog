const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Post = require('./Post');

const Comment = sequelize.define('Comment', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Post,
      key: 'author',
    },
  },
});


module.exports = Comment;

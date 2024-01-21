const sequelize = require('../config/connection');

const User = require('./User'); // Import the User model
const Post = require('./post');

const Comment = sequelize.define('Comment', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User, // Reference the User model
      key: 'username', // Reference the 'username' field in the User model
    },
  },
});

module.exports = Comment;

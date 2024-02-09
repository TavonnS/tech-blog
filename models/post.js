const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User = require('./user');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false, 
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    author: {
      type: DataTypes.STRING,
      defaultValue: 'Anonymous',
    },
  },
  {
    sequelize,
    timestamps: true, 
    modelName: 'Post',
    tableName: 'Posts', 
  }
);


module.exports = Post;

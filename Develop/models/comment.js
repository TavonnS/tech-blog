const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User = require('./user');
const Post = require('./Post');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.INTEGER, // Change this to the data type of the 'username' field in the User model
      allowNull: false,
      references: {
        model: User, // Assuming 'User' is the name of your User model
        key: 'id', // Assuming 'id' is the primary key in the User model
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    postParent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DataTypes.NOW, // ?
      references: {
        model: Post, // Assuming 'Post' is the name of your Posts model
        key: 'id', 
      },
    },
  },
  {
    sequelize,
    timestamps: true, // Adjust this based on your requirements
    modelName: 'Comment',
    tableName: 'Comments', // Ensure the table name is specified here
  }
);

Comment.belongsTo(User, { foreignKey: 'author', targetKey: 'id' });
Comment.belongsTo(Post, { foreignKey: 'postParent', targetKey: 'id' })

module.exports = Comment;

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User = require('./User');
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
      type: DataTypes.STRING, // Change this to the data type of the 'username' field in the User model
      allowNull: false,
      references: {
        model: 'User', // Assuming 'User' is the name of your User model
        key: 'username', // Assuming 'username' is the primary key in the User model
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
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      references: {
        model: 'Posts', // Assuming 'Posts' is the name of your Posts model
        key: 'id', // Assuming 'id' is the primary key in the Posts model
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


Comment.belongsTo(User, { foreignKey: 'authorId', targetKey: 'id' });
Comment.belongsTo(Post, { foreignKey: 'postId', targetKey: 'id' });


module.exports = Comment;

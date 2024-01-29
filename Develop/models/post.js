const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User = require('./User');

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
      allowNull: true, // Adjust this based on your requirements
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'User', // Assuming 'User' is the name of your User model
        key: 'username', // Assuming 'id' is the primary key in the User model        
      },
    },
  },
  {
    sequelize,
    timestamps: true, // Adjust this based on your requirements
    modelName: 'Post',
    tableName: 'Posts', // Ensure the table name is specified here
  }
);

Post.belongsTo(User, { foreignKey: 'author', targetKey: 'id' });

module.exports = Post;

// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// const User = require('./user');
// const Post = require('./post');

// class Comment extends Model {}

// Comment.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     text: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     author: {
//       type: DataTypes.STRING, 
//       allowNull: false,
//       references: {
//         model: "User", 
//         key: 'username', 
//       },
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
//     },
//     updatedAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
//     },
//     post: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       references: {
//         model: "Posts", 
//         key: 'title', 
//       },
//     },
//   },
//   {
//     sequelize,
//     timestamps: true, // Adjust this based on your requirements
//     modelName: 'Comment',
//     tableName: 'Comments', // Ensure the table name is specified here
//   }
// );

// module.exports = Comment;

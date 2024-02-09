const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

const User = require('./user');
const Post = require('./post');
<<<<<<< HEAD
// const Comment = require('./Comment');


// Post.belongsTo(User, {
//     foreignKey: 'author',
//     onDelete: 'CASCADE',
// });

// User.hasMany(Post, {
//     foreignKey: 'author',
//     onDelete: 'CASCADE'
// });

// Post.hasMany(Comment, {
//     foreignKey: 'post',
//     onDelete: 'CASCADE'
// });
// Comment.belongsTo(Post, {
//     foreignKey: 'post',
//     onDelete: 'CASCADE'
// });
// User.hasMany(Comment, {
//     foreignKey: 'author',
//     onDelete: 'CASCADE'
// });


=======



>>>>>>> 7052fef9891bbcbd9790fb9fdb6d71ab96dc5828
module.exports = { User, Post };
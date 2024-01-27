const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

const User = require('./User');
const Post = require('./Post');
const Comment = require('./comment');

Post.belongsTo(User, {
    foreignKey: 'author',
    onDelete: 'CASCADE'
});
User.hasMany(Post, {
    foreignKey: 'username',
    onDelete: 'CASCADE'
});
Post.hasMany(Comment, {
    foreignKey: 'author',
    onDelete: 'CASCADE'
});
Comment.belongsTo(Post, {
    foreignKey: 'title',
    onDelete: 'CASCADE'
});


module.exports = { User, Post, Comment };
const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

const User = require('./user');
const Post = require('./Post');
const Comment = require('./comment');

Post.belongsTo(User, {
    foreignKey: 'author',
    onDelete: 'CASCADE',
    targetKey: 'id'
});

User.hasMany(Post, {
    foreignKey: 'author',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'postParent',
    onDelete: 'CASCADE'
});
Comment.belongsTo(Post, {
    foreignKey: 'postParent',
    onDelete: 'CASCADE'
});
User.hasMany(Comment, {
    foreignKey: 'author',
    onDelete: 'CASCADE'
});


module.exports = { User, Post, Comment };
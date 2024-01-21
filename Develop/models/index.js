const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const User = require('./User');
const Post = require('./Post');
const Comment = require('./comment');


module.exports = { User, Post, Comment };
const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

const User = require('./user');
const Post = require('./post');



module.exports = { User, Post };
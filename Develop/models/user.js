const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 


const User = sequelize.define('User', {
  // Define model attributes
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // You can add more fields like 'name', 'bio', 'profilePicture', etc.
});

module.exports = User;
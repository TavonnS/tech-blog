// seeds/seed.js

const sequelize = require('../config/connection');
const User = require('../models/User'); // Import the User model
const Comment = require('../models/Comment');
const Post = require('../models/Post');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    // Sync the User model first
    await User.sync();

    // Add seed data for User model if needed

    // Now sync the other models
    await Post.sync();
    await Comment.sync();

    // Add seed data for Post and Comment models
    await Post.bulkCreate();
    await Comment.bulkCreate();
    await User.bulkCreate();

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the Sequelize connection
    await sequelize.close();
  }
};

seedDatabase();
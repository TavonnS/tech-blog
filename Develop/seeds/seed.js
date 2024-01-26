const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  try {
    console.log('Syncing database...');
    await sequelize.sync({ force: true });
    console.log('Database synced successfully');

    console.log('Seeding users...');
    await User.bulkCreate(userData);
    console.log('Users seeded successfully');

    console.log('Seeding posts...');
    await Post.bulkCreate(postData);
    console.log('Posts seeded successfully');

    console.log('Seeding comments...');
    await Comment.bulkCreate(commentData);
    console.log('Comments seeded successfully');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

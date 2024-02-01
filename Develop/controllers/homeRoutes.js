const express = require('express');
const router = express.Router();
const sequelize = require('../config/connection.js');

const { User, Post } = require('../models');
const withAuth = require('../utils/auth');



router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
     
      res.render('homepage', { 
        posts, 
        logged_in: req.session.logged_in,
        username: req.session.username  // is needed
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });



router.get('/posts/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });

      const post = postData.get({ plain: true });

      res.render('viewPost', { 
        ...post,
        logged_in: req.session.logged_in,
        // username: req.session.username  // if needed
      });
    } catch (err) {
      res.status(500).json(err);
    }
});




router.get('/dashboard', withAuth, async (req, res) => {
  try {
     // find the logged in user based on the session username
      const userData = await User.findByPk(req.session.user_id, {  // user_id is needed
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
});

    const postData = await Post.findAll({
      where: {
        id: req.session.id
      }
    });

    
    console.log(postData);

  const user = userData.get({ plain: true }); 
  const posts = postData.map((post) => post.get({ plain: true }));

  console.log(posts);

  res.render('dashboard', {
    ...posts,
    ...user,
    logged_in: true
  });
} catch (err) {
  res.status(500).json(err);
}
});



router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route,
    if (req.session.logged_in) {
      res.redirect('dashboard');
      return;
    }
    res.render('login');
  });

module.exports = router;
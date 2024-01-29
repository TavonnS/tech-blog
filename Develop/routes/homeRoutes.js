const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuth.js');
const sequelize = require('../config/connection.js');

const User = require('../models/User.js');
const Post = require('../models/post.js');

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
        username: req.session.username
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route,
    // note i dont think the login btn is seen by logged in users 
    if (req.session.logged_in) {
      res.redirect('dashboard');
      return;
    }
    res.render('login');
  });

  router.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
        // Find the logged-in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
        });

        const user = userData.get({ plain: true });
        
        // Now get the posts belonging to the user
        const posts = await Post.findAll({
            where: {
                author: req.session.user_id,
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        // Pass the posts to the template
        res.render('dashboard', {
            logged_in: req.session.logged_in, // Assuming req.session.logged_in is correctly set elsewhere
            user: user, // Explicitly passing user
            posts: posts, // Explicitly passing posts
            username: req.session.username || req.body.username
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json(err);
    }
});

// Example route for viewing a blog post
router.get("/posts/:postId", isAuthenticated, async (req, res) => {
  try {
      const postId = req.params.postId;
      // Fetch the blog post details from the database based on the postId

      // For example, assuming you have a Post model
      const post = await Post.findByPk(postId);

      // Render a view with post details
      res.render('viewPost', {
          post,
          loggedIn: req.session.loggedIn,
          username: req.session.username
      });
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
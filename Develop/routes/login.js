// also logout, signup
const express = require('express');
const router = express.Router();
const { User } = require('../models');


// Login route
router.post('/login', async (req, res) => {
    
        const userData = await User.findOne({
            where: { username: req.body.username, password: req.body.password }
        });

        if (!userData) {
            return res.status(400).json({ message: 'Incorrect username or password, please try again' });
        } else { 

        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.logged_in = true;  // changed logged_in to loggedIn


        // Wait for req.session.save() to complete before responding
        req.session.save(() => {
      
            res.redirect('/dashboard');
        }
        ); // end of req.session.save()
      } // end of else
    });


// Logout route
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {  // changed logged_in to loggedIn
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });


// Signup route
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.logged_in = true; 
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
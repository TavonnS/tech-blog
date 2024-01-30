// login, logout, and signup routes
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { User } = require('../models');


// Login route
router.post('/login', async (req, res) => {
 
    try {
        const userData = await User.findOne({
          where: { username: req.body.username },
        });
        console.log(userData); // added this line

        if (!userData) {
            return res.status(400).json({ message: 'Incorrect username or password, please try again' });
        }

        // Compare the entered password with the hashed password in the database
        const validPassword = await bcrypt.compare(req.body.password, userData.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Incorrect username or password, please try again' });
        }

        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.logged_in = true;

      
        // Wait for req.session.save() to complete before responding
        
        req.session.save(() => {
          console.log(req, res)
          req.session.username = userData.username;  // added this line
          res.redirect('/dashboard');
        
          });
    } catch (err) {
        res.status(500).json(err);
    }
});


// Logout route
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {  
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
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create a new user with the hashed password
      const userData = await User.create({
          username: req.body.username,
          password: hashedPassword,
      });

      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true; 
      
      // Save the session
      req.session.save(() => {
          res.redirect('/dashboard');
      });

  } catch (err) {
      console.error(err);
  }
});

module.exports = router;
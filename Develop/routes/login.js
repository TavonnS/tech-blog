// also logout
const express = require('express');
const router = express.Router();
const { User } = require('../models');


// Login route
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { username: req.body.username, password: req.body.password }
        });

        if (!userData) {
            console.log('Incorrect username or password');
            return res.status(400).json({ message: 'Incorrect username or password, please try again' });
        }

        req.session.user_id = userData.id;
        req.session.logged_in = true;


        // Wait for req.session.save() to complete before responding
        req.session.save(() => {
            console.log('Logged in');
            return res.redirect('/dashboard');
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json(err);
    }
});

module.exports = router;
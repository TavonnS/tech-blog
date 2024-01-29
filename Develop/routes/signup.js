const express = require('express');
const router = express.Router();
const { User } = require('../models/index.js');

router.post('/signup', async (req, res) => {
    try {
        const existingUser = await User.findOne({ where: { username: req.body.username } });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists, please use a different name' });
        }

        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
            // Add other user properties as needed
        });

        req.session.user_id = newUser.id;
        req.session.logged_in = true;

        req.session.save(() => {
            req.session.username = newUser.username;
            // The session has been saved, and now redirect the user
            res.redirect('/dashboard');
        });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;

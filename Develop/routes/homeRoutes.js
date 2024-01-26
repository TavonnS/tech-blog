const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuth.js');


router.get("/", (req, res) => {
    res.render('homepage')
});

router.get("/login", (req, res) => {    
    res.render('login')
});

router.get("/dashboard", isAuthenticated, (req, res) => {
    res.render('dashboard')
});

router.get("/signup", (req, res) => {
    res.render('signup')
});




module.exports = router;
const express = require("express");
const router = express.Router();
const sequelize = require("../config/connection.js");

const { User, Post } = require("../models");
const withAuth = require("../utils/auth");


router.get("/", withAuth, async (req, res) => {
  
  try {

    const userData = await User.findByPk(req.session.user_id, { attributes: { exclude: ["password"] } });

    const postData = await Post.findAll();

    const posts = postData.map((post) => post.get({ plain: true }));


    res.render("homepage", {
      posts, 
      logged_in: req.session.logged_in, 
      username: userData.username 
    });
  } catch (err) {
console.error(err);
  }
});


router.get("/posts/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
      
    const userID = req.session.user_id;
    const user = await User.findByPk(userID, { attributes: { exclude: ["password"] } });
    const post = postData.get({ plain: true });

   
    res.render("post", { 
      ...post,
      logged_in: req.session.logged_in,
      username: user.username,
    });

} catch (err) {
    console.error(err);
  }
});


router.get("/dashboard", withAuth, async (req, res) => {
  
  const user = await User.findByPk(req.session.user_id, { attributes: { exclude: ["password"] } });
  const postData = await Post.findAll({ where: { author: user.username } });
  const posts = postData.map((post) => post.get({ plain: true }));
  try {
    res.render('dashboard', { posts, logged_in: req.session.logged_in, username: user.username });
  } 
  
  
  catch (err) {
    console.error(err);
  }

});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route,
  if (req.session.logged_in) {
    res.redirect("dashboard");
    return;
  }
  res.render("login");
});


router.get("/logout", (req, res) => {
  console.log({ req, res });
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).redirect("/");
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

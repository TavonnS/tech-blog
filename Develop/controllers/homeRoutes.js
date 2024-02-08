const express = require("express");
const router = express.Router();
const sequelize = require("../config/connection.js");

const { User, Post } = require("../models");
const withAuth = require("../utils/auth");


router.get("/", async (req, res) => {
  console.log(res.body);
  try {
    const postData = await Post.findAll();

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts, 
      logged_in: req.session.logged_in, 
      username: req.session.username 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/posts/:id", withAuth, async (req, res) => {
  console.log(req.params.id, res.body);
  try {
    const postData = await Post.findByPk(req.params.id);

    if(!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    const post = postData.get({ plain: true });

    res.render("post", {
      ...post,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  
  const user = await User.findByPk(req.session.user_id, { attributes: { exclude: ["password"] } });
  console.log(user);
  const postData = await Post.findAll({ where: { author: user.username } });
  console.log(postData);
  const posts = postData.map((post) => post.get({ plain: true }));
  console.log(posts);
  try {
    res.render('dashboard', { ...posts });
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

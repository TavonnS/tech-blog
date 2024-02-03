const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    console.log(req.session.username);
    author: req.session.username;
    // Check if required fields are present in the request body
    if (!req.body.title || !req.body.content || !req.session.username) {
      return res.status(400).json({ error: 'Title, content, and author are required' });
    }

    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.session.username,
    });
    console.log(newPost);

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});



router.delete('/:id', withAuth, async(req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if(!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
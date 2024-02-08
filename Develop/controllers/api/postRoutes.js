const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', async(req, res) => {
  console.log(req.body);
  console.log(res.body);
  try {

    const newPost = await Post.create({
      ...req.body,
    });

    res.status(200).json(newPost);
    
  } catch(err) {
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
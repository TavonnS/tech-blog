const Post = require('../../models/Post');

const viewPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).send('Post not found');
        }

        res.render('viewPost', {
            post,
            loggedIn: req.session.loggedIn || false,
            username: req.session.username || null
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = viewPost;

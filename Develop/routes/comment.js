const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuth.js");

// Example route for handling comment submission
router.post("/comments", isAuthenticated, async (req, res) => {
    try {
        const postId = req.body.postId;
        const commentText = req.body.commentText;
        const userId = req.session.userId;

        // Assuming you have a Comment model
        const comment = await Comment.create({
            postId,
            userId,
            text: commentText
        });

        // Redirect to the blog post view after submitting a comment
        res.redirect(`/posts/${postId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
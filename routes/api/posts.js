const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator/");

const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    try {
      const user = await User.findById(req.user).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({date: -1}); // -1 is recent first
    res.json(posts);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/posts/:postId
// @desc    Get post by id
// @access  Private
router.get("/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).sort({date: -1});

    if (!post) {
      return res.status(404).json({message: "Post not found."});
    }
    res.json(post);
  } catch (error) {
    console.error(err.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({message: "Post not found."});
    }
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/posts/:postId
// @desc    Delete a post
// @access  Private
router.delete("/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({message: "Post not found"});
    }

    // Check user
    if (post.user.toString() !== req.user) {
      return res.status(401).json({message: "User not authorized"});
    }

    await post.deleteOne();
    res.json({message: "Post removed"});
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

//  ****** Likes  ******* //

// @route   PUT api/posts/like/:postId
// @desc    Like a post
// @access  Private
router.put("/like/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    // check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user).length > 0
    ) {
      return res.status(400).json({message: "Post already liked"});
    }

    post.likes.unshift({user: req.user});

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/posts/unlike/:postId
// @desc    Unlike a post
// @access  Private
router.put("/unlike/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    // check if the post has already been unliked
    if (
      post.likes.filter((like) => like.user.toString() === req.user).length <= 0
    ) {
      return res.status(400).json({message: "Post has not yet been liked"});
    }

    // remove the index
    const removeIdx = post.likes
      .map((post) => post.id.toString())
      .indexOf(req.user);
    post.likes.splice(removeIdx, 1);

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//  ****** Comments  ******* //

// @route   POST api/posts/comment/:postId
// @desc    Comment on a post
// @access  Private
router.post(
  "/comment/:postId",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    try {
      const user = await User.findById(req.user).select("-password");
      const post = await Post.findById(req.params.postId);

      const newComment = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user,
      });

      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   DELETE api/posts/comment/:postId/:commentId
// @desc    Delete a comment
// @access  Private
router.delete("/comment/:postId/:commentId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    //   pull out comment
    const comment = post.comments.find(
      (comment) => comment.id.toString() === req.params.commentId
    );

    if (!comment) {
      return res.status(404).json({message: "Comment not found"});
    }

    //  check user
    if (comment.user.toString() !== req.user) {
      return res.status(401).json({message: "User is not authorized"});
    }

    // remove the index
    const removeIdx = post.comments
      .map((comment) => comment.id.toString())
      .indexOf(req.user);
    post.comments.splice(removeIdx, 1);

    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;

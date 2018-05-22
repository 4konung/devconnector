const passport = require("passport");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// Load Post model
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// Validation
const validatePostInput = require("../../validation/post");
const validateCommentInput = require("../../validation/comment");
//@route GET api/posts/test
//@desc Tests posts route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Users posts" }));

//@route GET api/posts/
//@desc Get posts
//@access public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(error => res.status(404).json({ nopostsfoud: "There is no posts" }));
});

//@route GET api/posts/:id
//@desc Get posts by id
//@access public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(posts => res.json(posts))
    .catch(error =>
      res.status(404).json({ nopostfoud: "There is no post with such ID" })
    );
});

//@route DELETE api/posts/:id
//@desc Delete posts by id
//@access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ notauthorize: "User not authorize" });
          }
          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(error =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);

//@route Post api/posts/
//@desc Create posts
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const { text, name, avatar } = req.body;

    const newPost = new Post({
      text,
      name,
      avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

//@route POST api/posts/like/:id
//@desc Like posts
//@access Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          const { likes } = post;
          const {
            user: { id }
          } = req;

          const isLiked =
            likes.filter(({ user }) => user.toString() === id).length > 0;
          if (isLiked) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }

          // Add user id to likes array
          post.likes = [{ user: id }, ...likes];
          // Save
          post.save().then(post => res.json(post));
        })
        .catch(error =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);

//@route POST api/posts/unlike/:id
//@desc Unlike posts
//@access Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          const { likes } = post;
          const {
            user: { id }
          } = req;
          const isUnliked =
            likes.filter(({ user }) => user.toString() === id).length === 0;
          if (isUnliked) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }
          // Remove user id from likes array
          const filtered = likes.filter(({ user }) => user.toString() !== id);
          post.likes = [...filtered];
          // Save
          post.save().then(post => res.json(post));
        })
        .catch(error => res.status(404).json({ comment: "No comment found" }));
    });
  }
);

//@route POST api/posts/comment/:id
//@desc Add comment to post
//@access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        const { errors, isValid } = validateCommentInput(req.body);
        if (!isValid) {
          return res.status(400).json(errors);
        }

        const user = req.user.id;
        const { comments } = post;
        console.log(req.body);
        const { text, name, avatar } = req.body;

        const newComment = {
          text,
          name,
          avatar,
          user
        };
        // Add comment to post comments
        post.comments = [newComment, ...comments];
        //Save
        post.save().then(post => res.json(post));
      })
      .catch(error => res.status(404).json({ comment: "No comment found" }));
  }
);

//@route DELETE api/posts/comment/:id/:comment_id
//@desc Remove comment by id
//@access Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        const { comments } = post;
        const {params:{comment_id}} = req;
      
        //Check if comment exist
        const isExist = comments.filter(({ id }) => id.toString() === comment_id.toString()).length > 0;
        // If not exist
        if(!isExist){
          return res.status(404).json({commentnotexist: 'Comment does not exist'})
        }

        // Remove from array
        const filtered = comments.filter(({id})=> id.toString() !== comment_id)
        post.comments = [...filtered]
        //Save
        post.save().then(post => res.json(post))

      })
      .catch(error => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;

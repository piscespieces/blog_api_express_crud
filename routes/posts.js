const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  createCommentPost,
  updatePost,
  deletePost
} = require("../controllers/posts")

const router = express.Router();

router.route("/")
  .get(getPosts)
  .post(createPost)

router.route("/:id")
  .get(getPost)
  .post(createCommentPost)
  .put(updatePost)
  .delete(deletePost)

module.exports = router;
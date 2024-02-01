const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// create a post
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
});
// update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      return res.status(200).json("The post has been updated");
    } else {
      return res.status(403).json("You only can update your post");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
});
// delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json("The post has been deleted");
    } else {
      return res.status(403).json("You only can delete your post");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
});
// like/dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      return res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(200).json("The post has been disliked");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
});
// get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json("Post not found");
    }
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
});
// get timeline posts
router.get("/timeline/all", async (req, res) => {
  
  try {
    const currentUser = await User.findById(req.body.userId)
    const userPosts = await Post.find({userId: currentUser._id })
    const freindPosts = await Promise.all(
        currentUser.followings.map((freindId) => {
            return Post.find({userId: freindId})
        })
    )
    return res.status(200).json(userPosts.concat(...freindPosts))
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
});

module.exports = router;

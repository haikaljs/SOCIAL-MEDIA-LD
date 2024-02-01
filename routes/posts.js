const router = require("express").Router();
const Post = require("../models/Post");

// create a post
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
});
// update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
        await post.updateOne({$set: req.body})
        res.status(200).json("The post has been updated")
    } else {
      res.status(403).json("You only can update your post");
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
          await post.deleteOne()
          res.status(200).json("The post has been deleted")
      } else {
        res.status(403).json("You only can delete your post");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  });
// like/dislike a post
router.put("/:id/like", async (req, res) => {
    try {
     const post = await Post.findById(req.params.id)
     if(!post.likes.includes(req.body.userId)){
        await post.updateOne({$push: {likes: req.body.userId}})
        res.status(200).json("The post has been liked")
     }else{
        await post.updateOne({$pull: {likes: req.body.userId}})
        res.status(200).json("The post has been disliked")
     }
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  });
// get a post
// get timeline posts

module.exports = router;

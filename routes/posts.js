const router = require("express").Router()
const Post = require("../models/Post")

// create a post
router.post("/", async(req, res) => {
try {
    const newPost = new Post(req.body)
    const savedPost = await newPost.save()
    res.status(200).json(savedPost)
} catch (error) {
    console.log(error);
    res.status(500).json("Internal server error")
}
})
// update a post
// delete a post
// like a post
// get a post
// get timeline posts


module.exports = router
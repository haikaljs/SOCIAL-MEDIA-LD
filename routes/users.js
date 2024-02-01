const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User")

// update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  } else {
    return res.status(403).json("You only can update your account");
  }
});
// delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      res.status(200).json("Account has been deleted");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  } else {
    return res.status(403).json("You only can delete your account");
  }
});
// get a user
router.get("/:id", async(req,res) => {
try {
  const user = await User.findById(req.params.id)
  const {password, updatedAt, ...other} = user._doc
  if(!user){
    return res.status(404).json("User not found")
  }
  return res.status(200).json(other)
} catch (error) {
  return res.status(500).json("Internal server error")
}
})
// follow a user
// unfollow a user



module.exports = router;

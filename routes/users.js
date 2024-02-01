const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User")

// update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.user.isAdmin) {
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
      },  {
        new: true,
        runValidators: true,
        useFindAndModify: false
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
// get a user
// follow a user
// unfollow a user



module.exports = router;

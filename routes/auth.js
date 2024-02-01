const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // generate  new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new password
    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    });

    // save user and return response
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json("Wrong password");
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
});

module.exports = router;

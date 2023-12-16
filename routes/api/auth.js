const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const {check, validationResult} = require("express-validator/");
const bcrypt = require("bcryptjs");

const auth = require("../../middleware/auth");
const User = require("../../models/User");

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/",
  [check("email", "Please include a valid email").isEmail()],
  [check("password", "Password is required").exists()],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
      // if user exists
      let user = await User.findOne({email});

      if (!user) {
        return res.status(400).json({
          errors: [
            {
              message: "Invalid email or password",
            },
          ],
        });
      }

      // Match the password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [
            {
              message: "Invalid email or password",
            },
          ],
        });
      }

      // return the jsonwebtoken
      const payload = {
        user: user.id,
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({token});
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const {check, validationResult} = require("express-validator/");

const User = require("../../models/User");

// @route   GET api/users
// @desc    Register the users
// @access  Public
router.post(
  "/",
  [check("name", "Name is required").not().isEmpty()],
  [check("email", "Please include a valid email").isEmail()],
  [
    check(
      "password",
      "Please Enter a password with 6 or more characters."
    ).isLength({min: 6}),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    try {
      // if user exists
      let user = await User.findOne({email});

      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: "User already exists.",
            },
          ],
        });
      }

      // get user's gravatar
      const avatar = gravatar.url(email, {
        as: "200",
        rating: "pg",
        default: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrypt the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // return the jsonwebtoken
      const payload = {
        user: user.id, //mongoose uses abstraction
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
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

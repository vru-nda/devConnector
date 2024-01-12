const express = require("express");
const router = express.Router();
const config = require("config");
const request = require("request");
const {check, validationResult} = require("express-validator/");

const Profile = require("../../models/Profile");
const Post = require("../../models/Post");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user}).populate("user", [
      "name",
      "avatar",
    ]);

    if (!profile) {
      return res.status(400).json({message: "No profile found for this user."});
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/profile
// @desc    Get all user profile
// @access  Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/profile/user/:userId
// @desc    Get profile by userid
// @access  Public
router.get("/user/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.params.userId}).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({message: "No profile found for this user."});
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({message: "No profile found for this user."});
    }
    res.status(500).send("Server Error");
  }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // build profile object
    const profileFields = {};
    profileFields.user = req.user;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }
    // build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({user: req.user});

      // update profile
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          {user: req.user},
          {$set: profileFields},
          {new: true}
        );
        return res.json(profile);
      }

      // create a profile
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
    profileFields.social.instagram = res.send("Profile created.");
  }
);

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {title, company, location, from, to, current, description} = req.body;
    const newExp = {title, company, location, from, to, current, description};

    try {
      const profile = await Profile.findOne({user: req.user});

      profile.experience.unshift(newExp);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

// @route   DELETE api/profile/experience/:expId
// @desc    Delete experience from profile
// @access  Private
router.delete("/experience/:expId", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user});

    // Get the remove index
    const removeIdx = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.expId);

    profile.experience.splice(removeIdx, 1);

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of Study is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {school, degree, fieldofstudy, from, to, current, description} =
      req.body;

    const newExp = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({user: req.user});

      profile.education.unshift(newExp);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

// @route   DELETE api/profile/education/:expId
// @desc    Delete education from profile
// @access  Private
router.delete("/education/:eduId", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user});

    // Get the remove index
    const removeIdx = profile.education
      .map((item) => item.id)
      .indexOf(req.params.expId);

    profile.education.splice(removeIdx, 1);

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/profile/github/:username
// @desc    Get user repos from github
// @access  Public
router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET}`,
      method: "GET",
      headers: {
        "user-agent": "node.js",
      },
    };

    request(options, (error, response) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({message: "No github profile found."});
      }
      res.json(JSON.parse(response.body));
    });
  } catch (err) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/profile
// @desc    Delete profile, user and post
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({user: req.user.id});

    // remove profile
    await Profile.findOneAndDelete({user: req.user});

    // remove user
    await User.findOneAndDelete({_id: req.user});

    res.json({message: "User deleted."});
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation Profile
const validateProfileInput = require("../../validation/profile");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

//@route GET api/profile/test
//@desc Tests profile route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Users profile" }));

//@route GET api/profile
//@desc GET current user profile
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"], User)
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(error => res.status(404).json(error));
  }
);

//@route GET api/profile/all
//@desc GET all profiles
//@access Public
router.get('/all', (req,res)=>{
  const errors = {};
  Profile.find()
    .populate('user', ['name', 'avatar'], User)
    .then(
      profiles=> {
        if(!profiles){
          errors.noprofile = 'There are no profiles';
          return res.status(404).json(errors);
        }
        res.json(profiles)
      }
    )
    .catch(
      error => res.status(404).json({profile: 'There are no profiles'})
    )
})

//@route GET api/profile/handle/:handle
//@desc GET user profile by handle
//@access Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate('user',['name', 'avatar'], User)
    .then(
      profile=> {
        if(!profile) {
          errors.noprofile = 'There is no profile for this user'
          res.status(404).json(errors)
        }
        res.json(profile);
      }
    )
    .catch(
      error => res.status(404).json(error)
    )
});



//@route GET api/profile/user/:user_id
//@desc GET user profile by user_id
//@access Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  
  Profile.findOne({ user: req.params.user_id })
    .populate('user',['name', 'avatar'], User)
    .then(
      profile=> {
        if(!profile) {
          errors.noprofile = 'There is no profile for this user'
          res.status(404).json(errors)
        }
        res.json(profile);
      }
    )
    .catch(
      error => res.status(404).json(error)
    )
});

//@route POST api/profile
//@desc POST create user profile
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    // Chek Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    /* TODO_Make it more functional
    const keysBody = ['handle', 'company', 'website', 'location', 'bio', 'status', 'githubusername'];
     const keysSocial = ['facebook', 'youtube', 'twitter', 'instagram', 'linkedin']
    */

    //Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) {
      profileFields.githubusername = req.body.githubusername;
    }
    //Skils - Split into Array
    if (typeof req.body.skills !== undefined) {
      profileFields.skills = req.body.skills.split(",");
    }
    //Social - Object of fields
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create new prifile

        // Check if handle exist
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exist";
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;

const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {ObjectID} = require('mongodb');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const keys = require('../../config/keys');

const auth = require('../common/auth');

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Users works'}));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        res.status(400).json({ msg: 'Email already exists' })
      }else{
        let newUser;
        if (req.body.authType === 'google') {
          newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: '17W4r6AbC', //default dummy password
            avatar: req.body.avatar,
            googleId: req.body.googleId
          });
        }else{
          const avatar = gravatar.url(req.body.email, {
            s: '200', // Size
            r: 'pg', // Rating
            d: 'mm' //Default
          });
  
          newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar
          });
        }

        bcrypt.genSalt(10, (err,salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save()
              .then(user => {
                const newProfile = new Profile ({
                  user: user._id
                });
                newProfile.save();

                res.status(200).json(user);
              })
              .catch(err => {
                res.status(400).json(err);
              });
          });
        });
      }
    }).catch(err=>res.status(400).json(err));
});

// @route   POST api/users/login
// @desc    Login user / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  let password;
  if (req.body.authType === 'google') {
    password = '17W4r6AbC';
  }else {
    password = req.body.password;
  }

  const email = req.body.email;
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  startBcrypt = (user, password) => {
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if (isMatch) {
        // User match
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 7200 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          }
        )
      }else{
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    }).catch(err=>err);
  }

  User.findOne({ email })
    .then(user => {
      // Check for user
      if (!user) {
        if (req.body.authType === 'google') {
          res.status(404).json({ msg: 'Please signup.' });
        }
      }else{
        startBcrypt(user, password);
      }
    }).catch(err=>err);
});

// @route   GET api/users/current
// @desc    Get logged in user's info
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

// @route   GET api/users/:id
// @desc    Get a user's info
// @access  Public
router.get('/user_info/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  User.findById(id)
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }
      res.send({ name: user.name, email: user.email, avatar: user.avatar });
    })
    .catch(e => res.status(400).send(e))
});

module.exports = router;

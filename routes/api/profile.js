const express = require('express');
const router = express.Router();
const passport = require("passport");
const isEmpty = require('../../validation/is-empty');

const Profile = require("../../models/Profile");
const functions = require("../common/func");

// @route   GET api/Profile/test
// @desc    Test Profile route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Profile works'}));

// @route   GET api/Profile/bookmarks
// @desc    Get user's bookmarks
// @access  Private
router.get('/bookmarks/', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        return res.status(404).json({ msg: 'Profile not found' });
      }
      if (profile.bookmarks.length < 1){
        return res.status(404).json({ msg: 'No bookmarks yet.' });
      }
      res.status(200).json(profile.bookmarks);
    });
});

// @route   GET api/Profile/bookmarks
// @desc    Get user's bookmarks by Content id
// @access  Private
router.get('/bookmarks/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        return res.status(404).json({ msg: 'Profile not found' });
      }
      if (profile.bookmarks.length < 1){
        return res.status(200).json({ msg: 'No bookmarks yet.' });
      }
      const bookmarkIndex = profile.bookmarks
        .map(item => item.content.toString())
        .indexOf(req.params.id);
      res.json(profile.bookmarks[bookmarkIndex]);
    });
});

// @route   POST api/Profile/remove/bookmark/:id
// @desc    Delete user's bookmarked Content (require Content id)
// @access  Private
router.post('/remove/bookmark/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  response = functions.removeBookmark(req.params.id, req.user.id);
  res.status(response.status).json(response.msg);
});

// @route   GET api/Profile/assignments
// @desc    Get user's assignments
// @access  Private
router.get('/assignments/', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile.assignments.length < 1){
        return res.status(404).json({ msg: 'No assignment yet.' });
      }
      res.status(200).json(profile.assignments);
    });
});

// @route   POST api/Profile/remove/assignment/:id
// @desc    Delete user's assigned Content (require Content id)
// @access  Private
router.post('/remove/assignment/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  response = functions.removeAssignment(req.params.id, req.user.id);
  res.status(response.status).json(response.msg)
});

module.exports = router;

const express = require("express");
const router = express.Router();
const passport = require("passport");
const Parser = require('rss-parser');

// Model
const Feed = require('../../models/Feed');

// Validations
const validateFeedInput = require('../../validation/feed');
const isEmpty = require('../../validation/is-empty');

// @route   GET api/feeds/test
// @desc    Test feeds route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Feeds works" }));

// @route   POST api/feeds/isRSS/:url
// @desc    Check if URL an RSS feed
// @access  Public
router.post('/isRSS/', (req, res) => {
  const { errors, isValid } = validateFeedInput(req.body);
  let parser = new Parser();
  let http = '';

  if (!isValid) {
    return res.status(400).json(errors);
  }

  if (req.body.URL.includes('https')) {
    http = require('https');
  }else if (req.body.URL.includes('http')) {
    http = require('http');
  }

  let request = http.request(req.body.URL, function (resp) {
    let data = '';
    resp.on('data', function (chunk) {
      data += chunk;
    });
    resp.on('end', function () {
      // res.json(data.includes('<rss')&&data.includes('</rss>'));
      if (data.includes('<rss')&&data.includes('</rss>')) {
        // If URL contains feed, send rss title
        (async () => {
          let feed = await parser.parseURL(req.body.URL);
          res.status(200).json({ isRSS: true, title: feed.title });
        })();
      }else{
        res.status(400).json({ isRSS: false })
      }
    });
  });
  request.on('error', function (e) {
    console.log(e.message);
  });
  request.end();
});

// @route   POST api/feeds/
// @desc    POST a feed URL
// @access  Public
router.post('/', passport.authenticate("jwt", { session: false }), (req, res) => {
  newFeed = new Feed({
    name: req.body.name,
    URL: req.body.URL,
    addedBy: req.user.id,
  });

  newFeed.save()
    .then(feed => res.status(200).json(feed))
    .catch(err => res.status(400).json({ msg: 'Feed failed to add.' }));
});

// @route   GET api/feeds/
// @desc    Get all feeds
// @access  Public
router.get('/', (req, res) => {
  Feed.find()
    .sort({ date: -1 })
    .then(feeds => {
      if (isEmpty(feeds)){
        res.status(404).json({ msg: "No feed available yet." })
      }
      res.json(feeds)
    })
    .catch(err =>
      res.status(404).json({ msg: "No feed available yet." })
    );
});

// @route   GET api/feeds/:id
// @desc    Get feed by id
// @access  Public
router.get("/:id", (req, res) => {
  Feed.findById(req.params.id)
    .then(feeds => {
      if (isEmpty(feeds)) {
        res.status(404).json({ msg: "Feed URL not found" })
      }
      res.status(200).json(feeds)
    })
    .catch(err =>
      res.status(404).json({ msg: "Feed URL not found" })
    );
});

// @route   GET api/feeds/:id
// @desc    Get feed by id
// @access  Public
router.get("/parse_rss/:id", (req, res) => {
  Feed.findById(req.params.id)
    .then(feeds => {
      if (isEmpty(feeds)) {
        res.status(404).json({ msg: "Feed URL not found" })
      }
      let parser = new Parser();
      (async () => {

        let feed = await parser.parseURL(feeds.URL);
        let content = [];
      
        feed.items.forEach(item => {
          let newContent = ({
            title: item.title,
            URL: item.link,
            desc: item.content,
            category: 'RSS',
            date: item.isoDate
          });
          content.unshift(newContent);
        });

        res.status(200).json(content);
      
      })();
    })
    .catch(err =>
      res.status(404).json({ msg: "Feed URL not found" })
    );
});

// @route   DELETE api/feeds/:id
// @desc    Delete a feed (for user)
// @access  Private
router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Feed.findById(req.params.id)
      .then(feed => {
        // Check feed's owner
        if (feed.addedBy.toString() !== req.user.id) {
          return res.status(401).json({ msg: "User not authorized" });
        }

        // Delete
        feed.remove().then(() => res.status(200).json({ msg: "Feed URL has been removed." }));
      })
      .catch(err =>
        res.status(404).json({ msg: "Feed not found" })
      );
  }
);

module.exports = router;
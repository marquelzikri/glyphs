const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const passport = require("passport");
const isEmpty = require('../../validation/is-empty');

// Scraper
const ogs = require("open-graph-scraper");
const metafetch = require("metafetch");

// Content model
const Content = require("../../models/Content");

// Validation
const validateContentInput = require("../../validation/content");

// Common function
const functions = require("../common/func");

// @route   GET api/contents/test
// @desc    Test contents route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Contents works" }));

// @route   POST api/contents
// @desc    Create new Content
// @access  Private
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { errors, isValid } = validateContentInput(req.body);
    const url = req.body.URL;

    let newContent;
    let title = "";
    let desc = "";

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const fetchMetaData = () => {
      if (url.includes("techinasia")) {
        metafetch.fetch(
          url,
          {
            userAgent: "facebookexternalhit/1.1",
            flags: {
              images: false,
              links: false,
              language: false
            },
            http: {
              timeout: 30000,
              headers: {
                Accept: "*/*"
              }
            }
          },
          (err, meta) => {
            title = meta.title;
            desc = meta.description;
          }
        );
      } else {
        ogs({ url }, (er, re) => {
          // ToDo:
          //      remove ' - Kompas.com' at the end of title
          //      remove 'Kapanlagi.com: Musik - ' at the start of title
          //      remove ' | Republika Online' at the end of title
          //      remove from ' : ' until the end of title
          //      remove ' - VIVA' at the end of title and desc
          // has works: detik, kompas(title have flaws), tempo, tempo english (desc have flaws), kapan lagi, antara, republika, okezone, viva
          // liputan6 is down
          
          title = re.data.ogTitle;
          desc = re.data.ogDescription;
        });
      }
    };

    loadNewContentData = () => {
      if (
        (typeof title !== "undefined") &
        (typeof desc !== "undefined") &
        (title !== "") &
        (desc !== "")
      ) {
        newContent = new Content({
          assignee: req.user.id,
          URL: url,
          title: title,
          desc: desc,
          category: req.body.category
        });

        newContent.save().then(content => res.json(content));
      } else {
        setTimeout(loadNewContentData, 250);
      }
    };

    fetchMetaData();
    loadNewContentData();
  }
);

// @route   GET api/contents/
// @desc    Get all contents
// @access  Public
router.get("/", (req, res) => {
  Content.find()
    .sort({ date: -1 })
    .then(contents => res.json(contents))
    .catch(err =>
      res.status(404).json({ msg: "No Content available" })
    );
});

// @route   GET api/contents/:id
// @desc    Get Content by id
// @access  Public
router.get("/:id", (req, res) => {
  Content.findById(req.params.id)
    .then(contents => {
      if (isEmpty(contents)) {
        res.status(404).json({ msg: "No Content available" })
      }
      res.status(200).json(contents)
    })
    .catch(err =>
      res.status(404).json({ msg: "Content not found" })
    );
});

// @route   GET api/contents/category/today
// @desc    Get all today contents
// @access  Public
router.get("/category/today", (req, res) => {
  Content.find({ category: "Today" })
    .sort({ date: -1 })
    .then(contents => {
      if (isEmpty(contents)) {
        return res.status(404).json({ msg: "No Content available" })
      }
      res.status(200).json(contents)
    })
    .catch(err =>
      res.status(404).json({ msg: "No Content available" })
    );
});

// @route   GET api/contents/category/translate
// @desc    Get all translate contents
// @access  Public
router.get("/category/translate", (req, res) => {
  Content.find({ category: "Translate" })
    .sort({ date: -1 })
    .then(contents => {
      if (isEmpty(contents)) {
        res.status(404).json({ msg: "No Content available" })
      }
      res.status(200).json(contents)
    })
    .catch(err =>
      res.status(404).json({ msg: "No Content available" })
    );
});

// @route   GET api/contents/category/evergreen
// @desc    Get all evergreen contents
// @access  Public
router.get("/category/evergreen", (req, res) => {
  Content.find({ category: "Evergreen" })
    .sort({ date: -1 })
    .then(contents => {
      if (isEmpty(contents)) {
        res.status(404).json({ msg: "No Content available" })
      }
      res.status(200).json(contents)
    })
    .catch(err =>
      res.status(404).json({ msg: "No Content available" })
    );
});

// @route   GET api/contents/category/ideas
// @desc    Get all ideas contents
// @access  Public
router.get("/category/ideas", (req, res) => {
  Content.find({ category: "Ideas" })
    .sort({ date: -1 })
    .then(contents => {
      if (isEmpty(contents)) {
        res.status(404).json({ msg: "No Content available" })
      }
      res.status(200).json(contents)
    })
    .catch(err =>
      res.status(404).json({ msg: "No Content available" })
    );
});

// @route   GET api/contents/rss/:feed_id
// @desc    Get all contents from rss
// @access  Public
router.get("/category/rss/:feed_id", (req, res) => {
  Content.find({ category: "RSS", RSSId: req.params.feed_id })
    .sort({ date: -1 })
    .then(contents => {
      if (isEmpty(contents)) {
        res.status(404).json({ msg: "No Content available" })
      }
      res.status(200).json(contents)
    })
    .catch(err =>
      res.status(404).json({ msg: "No Content available" })
    );
});

// @route   DELETE api/contents/:id
// @desc    Delete a Content (for user)
// @access  Private
// @ToDo    Add a route to delete contents that longer than 3 days
router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Content.findById(req.params.id)
      .then(content => {
        // Check Content's owner
        if (content.assignee.toString() !== req.user.id) {
          return res.status(401).json({ notAuthorized: "User not authorized" });
        }

        // Delete
        content.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({ msg: "Content not found" })
      );
  }
);

// ------------------------------VOTES, WATCHERS, BOOKMARKS----------------------------------
// ToDo: add bookmarks: copy a Content to user->bookmarks (add bookmarks field into users model)

// @route   POST api/contents/vote/:id
// @desc    Vote on a Content
// @access  Private
router.post("/vote/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Content.findById(req.params.id)
      .then(content => {
        if (
          content.votes.filter(vote => vote.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyVote: "User already vote this Content" });
        }

        // Add user id to vote array
        content.votes.unshift({ users: req.user.id });

        // Save
        content.save().then(content => res.json(content));
      })
      .catch(err =>
        res.status(404).json({ msg: "Content not found" })
      );
  }
);

// @route   POST api/contents/unvote/:id
// @desc    Unote on a Content
// @access  Private
router.post("/unvote/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Content.findById(req.params.id)
      .then(content => {
        if (
          content.votes.filter(vote => vote.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notVote: "User haven't vote this Content" });
        }

        // Get remove index
        const removeIndex = content.votes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        // Splice out from vote array
        content.votes.splice(removeIndex, 1);

        // Save
        content.save().then(content => res.json(content));
      })
      .catch(err =>
        res.status(404).json({ msg: "Content not found" })
      );
  }
);

// @route   POST api/contents/watch/:id
// @desc    Watch Content
// @access  Private
router.post("/watch/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Content.findById(req.params.id)
      .then(content => {
        if (
          content.watchers.filter(
            watch => watch.user.toString() === req.user.id
          ).length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyWatch: "User is watching this Content" });
        }

        // Add user id to watchers array
        content.watchers.unshift({ users: req.user.id });

        // Save
        content.save().then(content => res.json(content));
      })
      .catch(err =>
        res.status(404).json({ msg: "Content not found" })
      );
  }
);

// @route   POST api/contents/unwatch/:id
// @desc    Unwatch Content
// @access  Private
router.post("/unwatch/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Content.findById(req.params.id)
      .then(content => {
        if (
          content.watchers.filter(
            watch => watch.user.toString() === req.user.id
          ).length === 0
        ) {
          return res
            .status(400)
            .json({ alreadyWatch: "User haven't watch this Content" });
        }

        // Get remove index
        const removeIndex = content.watchers
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        // Splice out from watchers array
        content.watchers.splice(removeIndex, 1);

        // Save
        content.save().then(content => res.json(content));
      })
      .catch(err =>
        res.status(404).json({ msg: "Content not found" })
      );
  }
);

// @route   POST api/contents/bookmark/:id
// @desc    Bookmark a Content
// @access  Private
router.post("/bookmark/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  const response = functions.addBookmark(req.params.id, req.user.id);
  res.status(response.status).json(response.msg);
});

// @route   POST api/contents/unbookmark/:id
// @desc    Unbookmark Content
// @access  Private
router.post("/bookmark/remove/:id", passport.authenticate("jwt", { session: false }),(req, res) => {
  const response = functions.removeBookmark(req.params.id, req.user.id);
  res.status(response.status).json(response.msg);
});

// ------------------------------COMMENTS-----------------------------------------------------------
// @route   POST api/contents/comment/:id
// @desc    Comment a Content
// @access  Private
router.post("/comment/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Content.findById(req.params.id)
      .then(content => {
        const newComment = {
          user: req.user.id,
          text: req.body.text
        };

        // Add comment to comments array
        content.comments.unshift(newComment);

        // Save
        content.save().then(content => res.json(content));
      })
      .catch(err =>
        res.status(404).json({ msg: "Content not found" })
      );
  }
);

// @route   DELETE api/contents/comment/:id/:comment_id
// @desc    Delete a comment on Content
// @access  Private
router.delete("/comment/:id/:comment_id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Content.findById(req.params.id.toString())
      .then(content => {
        // Check the comment
        if (
          content.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentNotExist: "Comment doens't exist" });
        }

        // Get remove index
        const removeIndex = content.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        content.comments.splice(removeIndex, 1);

        // Save
        content.save().then(content => res.json(content));
      })
      .catch(err =>
        res.status(404).json({ msg: "Content not found" })
      );
  }
);

// -------------------------------AssignTo----------------------------------------------------------------
// @route   POST api/contents/assign/me
// @desc    Set assignTo 
// @access  Private
router.post("/assign/me/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  const response = functions.addAssignment(req.params.id, req.user.id);
  res.status(response.status).json(response.msg);
});

// @route   POST api/contents/un_assign/me
// @desc    Remove user from assignTo 
// @access  Private
router.post("/un_assign/me/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  const response = functions.removeAssignment(req.params.id, req.user.id);
  res.status(response.status).json(response.msg);
});

module.exports = router;

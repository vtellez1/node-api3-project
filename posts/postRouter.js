const express = require('express');

const Posts = require('./postDb');

const router = express.Router();

// GET all posts - /api/posts
router.get('/', (req, res) => {
  Posts.get(req.query)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  });
});

// GET by specific id - /api/posts/:id
router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;

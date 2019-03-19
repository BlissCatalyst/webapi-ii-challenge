const express = require('express');

const db = require('./db.js');

const router = express.Router();

// NEW BLOG POST
router.post('/', async (req, res) => {
  try {
    const newPost = await db.insert(req.body);
    
    if(newPost) {
      res.status(201).json(newPost);
    } else {
      res.status(500).json({
        error: 'There was an error while saving the post to the database'
      })
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  }
});

// GET ALL BLOG POSTS
router.get('/', async (req, res) => {
  try {
    const allPosts = await db.find();

    res.status(200).json(allPosts);
  } catch {

  }
})

module.exports = router;
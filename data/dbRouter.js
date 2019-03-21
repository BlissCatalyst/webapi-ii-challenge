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
      });
    }
  } catch (error) {
    console.log(error);
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
    res.status(500).json({
      error: 'The posts information could not be retrieved.'
    })
  }
});

// GET A SINGLE POST BY ID
router.get('/:id', async (req, res) => {
  try{
    const post = await db.findById(req.params.id)

    if(post) {
      res.status(202).json(post);
    } else {
      res.status(500).json({
        error: 'The post information could not be retrieved.'
      });
    }
  } catch {
    res.status(404).json({
      message: 'The post with the specified ID does not exist'
    });
  }
});

// DELETE A POST
router.delete('/:id', async (req, res) => {
  try {
    const delPost = await db.remove(req.params.id);
    const allPosts = await db.find();

    if(delPost) {
      res.status(202).json(allPosts);
    } else {
      res.status(404).json({
        error: 'The post with the specified ID does not exist'
      });
    };
  } catch {
    res.status(500).json({
      message: 'The post could not be removed'
    });
  }
});

// UPDATE A POST
router.put('/:id', async (req, res) => {
  try {
    const changes = await db.update(req.params.id, req.body);
    const newPost = await db.findById(req.params.id);

    if(changes) {
      res.status(200).json(newPost);
    } else {
      res.status(500).json({
        errorMessage: 'The post information could not be modified.'
      });
    };
  } catch {
    res.status(400).json({
      error: 'Please provide title and contents for the post.'
    });
  }
});

module.exports = router;
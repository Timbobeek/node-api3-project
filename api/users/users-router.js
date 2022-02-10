const express = require('express');

const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')


const Users = require('./users-model');
const Posts = require('../posts/posts-model');

const router = express.Router();

router.get('/', (req, res) => {
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "The user information could not be retrieved",
      })
    })
});

router.get('/:id', (req, res) => {
  Users.getById(req.params.id)
    .then(user => {
      if (!user) {
          res.status(404).json({
            message: "The user with the specified ID was not found"
          })
        }
        res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({
        message: "The user information could not be retrieved",
        error: err.message
      })
    })
  // this needs a middleware to verify user id
});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

module.exports = router;

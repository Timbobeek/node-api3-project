const express = require('express');

const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')


const Users = require('./users-model');
const Posts = require('../posts/posts-model');

const router = express.Router();

//------------------------GET----------------------------------

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

//------------------------POST--------------------------

router.post('/', (req, res) => {
  const { name } = req.body;
  if(!name) {
    res.status(400).json({
      message: "The user is missing required name"
    })
  } else {
    Users.insert({name})
      .then(({id})=>{
        return Users.getById(id)
      })
      .then(newUser => {
        res.status(201).json(newUser)
      })
      .catch(err => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
          error: err.message
        })
      })
  }
  // this needs a middleware to check that the request body is valid
});

//------------------------PUT--------------------------------

router.put('/:id', (req, res) => {
  const { name } = req.body;
  if(!name) {
    res.status(400).json({
      message: "The user is missing required name"
    })
  } else {
    Users.getById(req.params.id)
      .then(stuff=>{
        if (!stuff){
          res.status(404).json({
            message: 'The post with the specified ID does not exist'
          })
        } else {
          return Users.update(req.params.id, req.body)
        }
      })
      .then(info => {
        if (info) {
          return Users.getById(req.params.id)
        }
      })
      .then(user =>{
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
          error: err.message
        })
      })
  }
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

//------------------------DELETE------------------------------

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

//----------------------------GET POSTS-------------------------- 

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

//----------------------------POST POSTS------------------------------

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

module.exports = router;

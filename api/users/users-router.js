const express = require('express');

const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')


const Users = require('./users-model');
const Posts = require('../posts/posts-model');

const router = express.Router();

//------------------------GET----------------------------------

router.get('/', (req, res, next) => {
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get('/:id', validateUserId, (req, res, next) => {
  res.json(req.user)
  // this needs a middleware to verify user id
});

//------------------------POST--------------------------

router.post('/', (req, res, next) => {
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
      .catch(next);
  }
  // this needs a middleware to check that the request body is valid
});

//------------------------PUT--------------------------------

router.put('/:id', validateUserId, (req, res, next) => {
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
            message: 'The user with the specified ID does not exist'
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
      .catch(next);
  }
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

//------------------------DELETE------------------------------

router.delete('/:id', validateUserId, async (req, res, next) => {
  try{
    const user = await Users.getById(req.params.id)
    if (!user){
      res.status(404).json({
        message: "The user with the specified ID does not exist"
      })
    } else {
      await Users.remove(req.params.id)
      res.json(user)
    }
  }catch(error) {
      console.log(error);
      res.status(500).json({
        message: "The user could not be removed",
      });
    }
  // this needs a middleware to verify user id
});

//----------------------------GET POSTS-------------------------- 

router.get('/:id/posts', validateUserId, (req, res, next) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      if (posts.length > 0) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: 'The user with the specified ID does not exist' });
      }
    })
    .catch(next);
  // this needs a middleware to verify user id
});

//----------------------------POST POSTS------------------------------

router.post('/:id/posts', validateUserId, (req, res, next) => {

  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

//----------------------------ERROR--------------------

router.use((err, req, res, next)=>{
  res.status(err.status || 500).json({
    custom: 'oopsies',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;

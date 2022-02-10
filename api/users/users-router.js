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

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

//------------------------POST--------------------------

router.post('/', validateUser, (req, res, next) => {
  Users.insert({ name: req.name})
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});

//------------------------PUT--------------------------------

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, {name: req.name} )
  .then(()=>{
    return Users.getById(req.params.id)
  })
  .then(user => {
    res.json(user)
  })
  .catch(next)
});

//------------------------DELETE------------------------------

router.delete('/:id', validateUserId, async (req, res, next) => {
  try{
    await Users.remove(req.params.id)
    res.json(req.user)
  }catch(error) {
      next(error)
    }
});

//----------------------------GET POSTS-------------------------- 

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try {
    const result = await Users.getUserPosts(req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
});

//----------------------------POST POSTS------------------------------

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  try{
    const result = await Posts.insert({
      user_id: req.params.id,
      text: req.text
    })
    res.status(201).json(result)
  } catch (error){
    next(error)
  }
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

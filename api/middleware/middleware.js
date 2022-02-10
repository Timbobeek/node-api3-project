const Users = require('../users/users-model')

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString()
  console.log(`${req.method} , ${req.url}, ${timestamp}`)
  next()
}

async function validateUserId(req, res, next) {
  try{
    const user = await Users.getById(req.params.id)
    if(!user) {
      res.status(404).json({
        message: 'the user was not found'
      })
    } else {
      req.user = user
      next()
    }
  } catch (err){
    res.status(500).json({
      message: 'cant find user'
    })
  }
}

function validateUser(req, res, next) {
  const {name} = req.body
  if (!name) {
    res.status(400).json({
      message: 'missing required name field'
    })
  } else {
    req.name = name
    next()
  }
}

function validatePost(req, res, next) {
  const {text} = req.body
  if (!text) {
    res.status(400).json({
      message: 'missing required text field'
    })
  } else {
    req.text = text;
    next()
  }
}



module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}

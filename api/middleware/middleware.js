const {getById} = require('../users/users-model')

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString()
  console.log(`${req.method} , ${req.url}, ${timestamp}`)
  next()
}

function validateUserId(req, res, next) {
  getById(req.params.id)
  .then( user => {
    if (user) {
      req.user = user
      next()
    } else {
      next({status: 404, message: `user ${req.params.id} was not found`})
    }
  })
  .catch(next)
}

function validateUser(req, res, next) {
  
}

function validatePost(req, res, next) {
  
}



module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}

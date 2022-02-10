function logger(req, res, next) {
  const timestamp = new Date().toLocaleString()
  console.log(`${req.method} , ${req.url}, ${timestamp}`)
  next()
}

function validateUserId(req, res, next) {
  
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

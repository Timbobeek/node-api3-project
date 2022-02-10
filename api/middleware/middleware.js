function logger(req, res, next) {
  const timestamp = new Date().toLocaleString()
  console.log(`${req.method} , ${req.url}, ${timestamp}`)
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}



module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}

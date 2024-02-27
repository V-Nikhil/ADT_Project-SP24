function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next(); // Move on to the next middleware or route handler
  }
  
  module.exports = logger;
  
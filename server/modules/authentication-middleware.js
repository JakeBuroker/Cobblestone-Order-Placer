const rejectUnauthenticated = (req, res, next) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // They were authenticated!
    next();
  } else {
    // failure best handled on the server
    res.sendStatus(403);
  }
};

module.exports = { rejectUnauthenticated };

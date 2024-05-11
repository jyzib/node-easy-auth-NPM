const Logout = (req, res, next) => {
  res.cookie('user', '')
  next()
}

module.exports = Logout

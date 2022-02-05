module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.status(400).json({
        status: false,
        message: 'No Authorization!'
      });
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.status(400).json({
        status: false,
        message: 'Anda telah login!'
      })
    }
  },
}

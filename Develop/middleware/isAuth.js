// Middleware function to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    // If user is logged in, continue to the next middleware or route handler
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }};

module.exports = isAuthenticated;
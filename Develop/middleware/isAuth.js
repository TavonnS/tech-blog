// Middleware function to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    // If user is logged in, continue to the next middleware or route handler
    if (req.session.logged_in) {
      return next();
    }
  
    // If user is not logged in, redirect to sign-up or sign-in page
    res.redirect('/login'); // You can change this to '/signup' if you prefer
  };
  

  // Other routes that require authentication can use the `isAuthenticated` middleware

module.exports = isAuthenticated;
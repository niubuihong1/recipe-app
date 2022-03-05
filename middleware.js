module.exports.isLoggedIn = (req, res, next) => {
  console.log("REQ.USER...", req.user);
  if (!req.isAuthenticated()) {
    // Store the url they were requesting so when they're login then are redirected back to that url
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in!");
    return res.redirect("/login");
  }
  next();
};

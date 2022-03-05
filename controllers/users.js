const User = require("../models/user");

// Render register form
module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

// Register a user
module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to OurRecipes!");
      res.redirect("/recipes");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

// Render login form
module.exports.renderLogin = (req, res) => {
  res.render("users/login")
}

// Log in a user
module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!")
  const redirectUrl = req.session.returnTo || "/recipes";
  delete req.session.returnTo;
  console.log(redirectUrl);
  res.redirect(redirectUrl);
};

// Log out a user
module.exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "Goodbye!")
  res.redirect('/recipes')
};

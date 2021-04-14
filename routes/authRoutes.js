const passport = require("passport");

module.exports = (app) => {
  // Whenever the user comes to this route, this section will make the
  // request to go through the OAuth flow (passport).
  // This routes tells the passport to authenticate this user by using
  // google strategy.
  // Scope: google will ask the permission for these to scope to use
  // behalf of Emaily app.
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  // after redirecting from the google, we will handover again
  // to the passport whrever we need user profile information. (or)
  // user will be sent back to this router by google with some code
  // for the follow up request.
  // Passport will handle this request in a different way,
  // since it has a code along with the router
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};

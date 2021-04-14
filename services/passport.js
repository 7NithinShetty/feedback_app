const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// instead of exporting and importing emailyuser model,
// we are using following line of code.(pulling model class)
const User = mongoose.model("Users");

//adding unique id into the cookie for the follow up request
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// making the follow up request without entering the password again.
// By using id stored in cookies
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  // Google Strategy. We can use other strategies like fb, github also
  // by "new facebookStrategy()"
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      // after user grants permission to Emaily app, they will
      // redirected to following address.
      callbackURL: "/auth/google/callback",
      // Since we are using Heroku, heroku  uses heroku proxy to redirect
      // the request from the browser to the correct heroku server.
      // But the Google Strategy assumes, if the request went through any
      // proxy is not safe anymore. But for this dummy application, we can
      // trust Heroku. So we can write this following line of code to make
      // it work correctly.
      proxy: true,
    },
    // return
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // we already have a record with the given profile ID
        return done(null, existingUser);
      }
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);

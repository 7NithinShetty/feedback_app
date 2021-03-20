const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const emailyUser = mongoose.model("emailyUsers");

//adding unique id into the cookie for the follow up request
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// making the follow up request without entering the password again.
// By using id stored in cookies
passport.deserializeUser((id, done) => {
  emailyUser.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  //Google Strategy
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await emailyUser.findOne({ googleId: profile.id });
      if (existingUser) {
        // we already have a record with the given profile ID
        done(null, existingUser);
      } else {
        const user = await new emailyUser({ googleId: profile.id }).save();
        done(null, user);
      }
    }
  )
);  

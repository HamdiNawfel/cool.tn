require('dotenv').config()
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

//var passport = require('passport');
// var Strategy = require('passport-facebook').Strategy;

const mongoose = require('mongoose');
const User = mongoose.model("users");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_OR_KEY;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

// module.exports = passport => {
//     passport.use(
//       new Strategy({
//         clientID: process.env.FACEBOOK_APP_ID,
//         clientSecret: process.env.FACEBOOK_APP_SECRET,
//         callbackURL: 'http://localhost:8080/auth/facebook/callback'
//       },(accessToken, refreshToken, profile, cb)=>{
//         return cb(null, profile);
//       })
//     );
//   };
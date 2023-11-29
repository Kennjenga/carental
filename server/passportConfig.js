const passport = require("passport");
const db = require("./db");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      const query =
        "SELECT username, password, id FROM profiles where username = ?";
      db.query(query, [username], (err, result) => {
        if (err) {
          throw err;
        }
        // If the user exists in our database then we will compare the hashed password from the database with the one that was entered by the
        if (result.length === 0) {
          return done(null, false);
        }
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (err) {
            throw err;
          }
          if (response === true) {
            return done(null, result[0]);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    const query = "SELECT username, password, id FROM profiles WHERE id = ?";
    db.query(query, [id], (err, result) => {
      if (err) throw err;
      const userInfo = {
        id: result[0].id,
        username: result[0].username,
      };
      done(null, userInfo);
    });
  });
};

//CRUD operations
const db = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "mySecretKey",
    resave: false, // Corrected from "resolve" to "resave"
    saveUninitialized: false,
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser("mySecretKey"));

app.use(passport.initialize());
app.use(passport.session());
//passportConfig.js
require("./passportConfig")(passport);

app.get("/", (req, res) => {
  res.send("Hello This is my server to connect thro APIs and dbs");
});
//updating database
app.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const query =
    "INSERT INTO profiles (`username`, `email`, `password`) VALUES (?, ?, ?)";
  const query2 = "SELECT * FROM profiles WHERE email = ?"; // Corrected variable name from "quert" to "query2"

  db.query(query2, [email], (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length > 0) {
      res.send({ message: "email already exists" }); // Changed "username" to "email" in the message
    } else {
      const hashedpassword = bcrypt.hashSync(password, 10);
      db.query(query, [username, email, password], (err, result) => {
        if (err) {
          throw err;
        }
        res.send({ message: "user created" });
      });
    }
  });
});

///login in user
app.post("/Login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      throw err;
    }
    if (user) {
      req.login(user, (err) => {
        if (err) {
          throw err;
        }
        res.send("User Logged In");
        console.log(user);
      });
    }
    if (!user) {
      res.send("User doesn't exist");
    }
  })(req, res, next);
});

app.get("/getUser", (req, res) => {
  res.send(req.user);
});

app.listen(3001, () => {
  console.log("server started on port 3001");
});

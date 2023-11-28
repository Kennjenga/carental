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

app.get("/", (req, res) => {
  res.send("Hello World");
});

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
      db.query(query, [username, email, hashedpassword], (err, result) => {
        if (err) {
          throw err;
        }
        res.send({ message: "user created" });
      });
    }
  });
});

app.listen(3001, () => {
  console.log("server started on port 3001");
});

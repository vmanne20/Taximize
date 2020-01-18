//package imports
const express = require("express");
const mongoose = require("mongoose");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);

var bodyParser = require("body-parser");

//initializing
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb://mongo:27017/ReTax",
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log("MongoDB Connected!");
    }
  }
);

var db = mongoose.connection;
app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  })
);

//routing
require("./routes")(app);

const PORT = process.env.PORT | 3000;
app.listen(PORT, () => {
  console.log("Listening on " + PORT);
});

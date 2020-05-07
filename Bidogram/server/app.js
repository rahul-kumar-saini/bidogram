/* jshint node: true */
"use strict";

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./configurations/database.config");
const routes = require("./routes/index");
const auth = require("./middlewares/authentication");
const app = express();

// Whitelist for CORS
const whitelist = ["http://localhost:3000", "http://localhost:8888"];
//const whitelist = ['http://159.203.42.164:3000/', 'http://138.197.136.193:8888'];

// CORS options
var corsOptions = {
  origin: function (origin, callback) {
    console.log("ORIGIN:", origin);
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// Options for the DB
const dbOptions = {
  keepAlive: 500,
  poolSize: 16,
  // reconnectTries: 10,
  promiseLibrary: Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

// connect to db
mongoose
  .connect(dbConfig.url, dbOptions)
  .then(() => {
    console.log("Successfully connected to the DB");
  })
  .catch((err) => {
    console.error(err);
  });
mongoose.connection.on("disconnected", () => {
  return console.info("Disconnected from mongodb.");
});

// Helmet dependency to help with XSS prevention and basic security
app.use(helmet());
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
  })
);
app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Origin", "http://159.203.42.164:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(auth.sessionSettings);
app.use(auth.setEmail);

// api routes
app.use("/api", routes);
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// For testing auth, delete after
app.get("/api/private/", auth.isAuthenticated, function (req, res, next) {
  return res.end("This is private. If you see this, you are logged in");
});

// setup server
const http = require("http");
const PORT = 5000;
const server = http.createServer(app);

server.listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("Started HTTP server on http://localhost:%s", PORT);
});

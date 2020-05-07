/* jshint node: true */
"use strict";

/**
 * Module dependencies.
 */

const session = require("express-session");
const cookie = require("cookie");
const mongoose = require("mongoose");
const utils = require("../utilities/utils.js");

const UserModel = mongoose.model("User");

/**
 * Exported helper functions
 */

// session authentication settings
exports.sessionSettings = session({
  secret: "bruh twitch 2 sick",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
  },
});

// returns cookie settings for cookie header
exports.setCookie = function (email) {
  if (!email) email = "";
  return cookie.serialize("email", email, {
    path: "/",
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
  });
};

// checks to make sure user has permission (own user or has godmode)
exports.hasPermission = function (req, res, next) {
  let current = cookie.parse(req.headers.cookie).email.toString();
  let target = req.body.email.toLowerCase();
  UserModel.findById(current, { godmode: 1 }, function (err, user) {
    if (err) return res.status(500).json(utils.parseErrorResp(500, err));
    if (!user)
      return res
        .status(404)
        .json(utils.parseErrorResp(404, "Request originated fraudulenty."));
    if (user._id !== target && !user.godmode)
      return res.status(401).end("Access denied");
    next();
  });
};

/**
 * Exported middleware functions
 */

exports.setEmail = function (req, res, next) {
  req.email = req.session.email ? req.session.email : null;
  if (req.body.dataURL) {
    let smallbody = {
      name: req.body.name,
    };
    console.log(
      "HTTP request",
      req.email,
      req.method,
      req.url,
      smallbody,
      req.query,
      req.params
    );
  } else {
    console.log(
      "HTTP request",
      req.email,
      req.method,
      req.url,
      req.body,
      req.query,
      req.params
    );
  }
  next();
};

exports.isAuthenticated = function (req, res, next) {
  if (!req.email) return res.status(401).end("Access denied");
  next();
};

exports.isUnauthenticated = function (req, res, next) {
  if (req.email) return res.status(401).end("User must be logged out");
  next();
};

exports.isOwnUser = function (req, res, next) {
  let current = req.email;
  let target = req.params.email;
  if (current !== target) return res.status(401).end("Access denied");
  next();
};

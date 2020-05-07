/* jshint node: true */
"use strict";

require("../models/user");
const mongoose = require("mongoose");
const UserModel = mongoose.model("User");
const path = require('path');

exports.info = function (req, res) {
  UserModel.find({ isStreaming: true }, (err, users) => {
    if (err) return res.status(500).end("Failed DB look up.");
    res.json(users);
  });
};

exports.start = function (req, res) {
  let valid = false;
  UserModel.findOne({ streamKey: req.body.data.streamKey }, (err, user) => {
    if (err) return res.status(500).end("Failed DB Look up.");
    if (user) {
      // no user found??
      valid = true;
      UserModel.updateOne(
        { _id: user._id },
        { isStreaming: true },
        { upsert: true },
        function (err, doc) {
          if (err) return res.status(500).end("Failed DB update.");
          res.json({ valid: valid });
        }
      );
    } else {
      return res.status(404).end("No such user.");
    }
  });
};

exports.end = function (req, res) {
  let valid = false;
  UserModel.findOne({ streamKey: req.body.data.streamKey }, (err, user) => {
    if (err) return res.status(500).end("Failed DB Look up.");
    if (user) {
      valid = true;
      UserModel.updateOne(
        { _id: user._id },
        { isStreaming: false },
        { upsert: true },
        function (err, doc) {
          if (err) return res.status(500).end("Failed DB update.");
          res.json({ valid: valid });
        }
      );
    } else {
      return res.status(404).end("No such user.");
    }
  });
};

exports.thumbnail = function(req, res) {
  const imgNum = Math.floor(Math.random() * Math.floor(2)) + 1;
  res.setHeader("Content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, `../static/thumbnails/default-${imgNum}.jpg`));
};

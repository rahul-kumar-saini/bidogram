/* jshint node: true */
"use strict";

/**
 * Module dependencies.
 */
require("../models/user");
const mongoose = require("mongoose");
const UserModel = mongoose.model("User");

const auth = require("../middlewares/authentication");
const crypto = require("../middlewares/cryptography");
const utils = require("../utilities/utils");
const nodemailer = require("nodemailer");

// creates a new user
exports.signup = function (req, res) {
  let email = req.body.email.toLowerCase();
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let password = req.body.password;
  let dateOfBirth = new Date(req.body.dateOfBirth);
  let godmode = req.body.godmode;
  // check if email already exists
  UserModel.findById(email, function (err, user) {
    if (err) return res.status(500).json(utils.parseErrorResp(500, err));
    if (user)
      return res
        .status(409)
        .json(utils.parseErrorResp(409, `Email ${email} already exists`));
    let salt = crypto.generateSalt();
    let hash = crypto.generateHash(password, salt);
    // generate stream key
    const streamKey = require("crypto").randomBytes(16).toString("hex");
    // insert new user into database
    UserModel.updateOne(
      {
        _id: email,
      },
      {
        _id: email,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        salt: salt,
        hash: hash,
        godmode: godmode,
        streamKey: streamKey,
        isStreaming: false,
      },
      {
        upsert: true,
      },
      function (err) {
        if (err) return res.status(500).json(utils.parseErrorResp(500, err));
        // start a session
        req.session.email = email;
        res.setHeader("Set-Cookie", auth.setCookie(email));
        return res.json({
          email: email,
          firstName: firstName,
          lastName: lastName,
          godmode: godmode,
        });
      }
    );
  });
};

// authenticates a user into the application
exports.signin = function (req, res) {
  let email = req.body.email.toLowerCase();
  let password = req.body.password;
  // retrieve user from the database
  UserModel.findById(
    email,
    {
      firstName: 1,
      lastName: 1,
      hash: 1,
      salt: 1,
      godmode: 1,
    },
    function (err, user) {
      if (err) return res.status(500).json(utils.parseErrorResp(500, err));
      if (!user)
        return res.status(401).json(utils.parseErrorResp(401, "Access Denied"));
      let hash = crypto.generateHash(password, user.salt);
      if (user.hash !== hash)
        return res.status(401).json(utils.parseErrorResp(401, "Access Denied")); // invalid password
      // start a session
      req.session.email = user._id;
      res.setHeader("Set-Cookie", auth.setCookie(user._id));
      return res.json({
        email: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        godmode: user.godmode,
      });
    }
  );
};

// signs the user out of the application
exports.signout = function (req, res) {
  req.session.destroy();
  res.setHeader("Set-Cookie", auth.setCookie(""));
  return res.json("Signout successful");
};

// gets a specific user by email
exports.getUser = function (req, res) {
  //let email = validator.normalizeEmail(req.params.email);
  const email = req.email;
  UserModel.findById(
    email,
    {
      hash: 0,
      salt: 0,
    },
    function (err, user) {
      if (err) return res.status(500).json(utils.parseErrorResp(500, err));
      if (!user)
        return res
          .status(404)
          .json(utils.parseErrorResp(404, `Email ${email} does not exist`));
      return res.json(user);
    }
  );
};

exports.getUsers = function (req, res) {
  UserModel.find({}, {
    hash: 0,
      salt: 0,
  }, function (err, users) {
    if (err) return res.status(500).json(utils.parseErrorResp(500, err));
    return res.json(users);
  });
};

// updates the password for a given user
exports.setPassword = function (req, res) {
  let email = req.body.email.toLowerCase();
  let newPass = req.body.password;
  let salt = crypto.generateSalt();
  let hash = crypto.generateHash(newPass, salt);
  UserModel.findByIdAndUpdate(
    email,
    {
      $set: {
        salt: salt,
        hash: hash,
      },
    },
    function (err, user) {
      if (err) return res.status(500).json(utils.parseErrorResp(500, err));
      if (!user)
        return res
          .status(404)
          .json(utils.parseErrorResp(404, `Email ${email} does not exist`));
      return res.json("Password update successful");
    }
  );
};

// sets up a reset password token & sends it to user email
// inspiration/tutorial followed here : http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/
exports.sendPasswordReset = function (req, res) {
  let email = req.body.email.toLowerCase();
  // create reset token
  const token = crypto.generateRandomBytes(16);
  // set token to user
  UserModel.findByIdAndUpdate(
    email,
    {
      $set: {
        passwordToken: token,
        tokenExpiryDate: Date.now() + 3600000, // 1 hour time
      },
    },
    function (err, user) {
      if (err) return res.status(500).json(utils.parseErrorResp(500, err));
      if (!user)
        return res
          .status(404)
          .json(utils.parseErrorResp(404, `Email ${email} does not exist`));
      // set up the email
      let transport = nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: "bidogramsender",
          pass: "placeholder",
        },
      });
      let mailDetails = {
        to: user._id,
        from: "passwordreset@bidogram.ca",
        subject: "Bidogram Password Reset",
        text:
          "You are receiving this because you (or someone else) has requested to reset your password.\n" +
          "If this was not you then ignore this email.\n" +
          "Please click on the following link, or paste it into your browser to reset your password." +
          "http://" +
          req.headers.host +
          "/users/resetpassword/" +
          user.passwordToken +
          "\n",
      };
      // send the email
      transport.sendMail(mailDetails, function (err) {
        if (err) return res.status(500).json(utils.parseErrorResp(500, err));
        return res.json("Password reset email sent");
      });
    }
  );
};

// resets the password of a  user
// inspiration/tutorial followed here : http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/
exports.resetPassword = function (req, res) {
  let token = req.params.token.toString();
  // get new password
  let newPass = req.body.password;
  let salt = crypto.generateSalt();
  let hash = crypto.generateHash(newPass, salt);
  // update the user with the new pasword
  UserModel.findOneAndUpdate(
    {
      passwordToken: token, //,
      //tokenExpiryDate: { $gt: Date.now()}
    },
    {
      $set: {
        hash: hash,
        salt: salt,
      },
    },
    function (err, user) {
      console.log(user);
      if (err) return res.status(500).json(utils.parseErrorResp(500, err));
      if (!user)
        return res
          .status(401)
          .json(utils.parseErrorResp(401), "Invalid/expired token.");
      // set up a confirmation email
      let transport = nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: "bidogramemailsender",
          pass: "placeholder",
        },
      });
      console.log("transport created");
      let mailDetails = {
        to: user._id,
        from: "passwordreset@bidogram.ca",
        subject: "Bidogram Password Reset",
        text:
          "You are receiving this email as conformation that your password has been reset.\n" +
          "Thank you.",
      };
      // send the email
      transport.sendMail(mailDetails, function (err) {
        if (err) return res.status(500).json(utils.parseErrorResp(500, err));
        return res.json("Password reset successful.");
      });
    }
  );
};

exports.getStreamKey = function (req, res) {
  const username = req.query.username;
  UserModel.findOne({ _id: username }, (err, user) => {
    if (err) return res.status(500).end("DB look up failed.");
    if (!user) return res.status(404).end("No such user.");
    res.json({ streamKey: user.streamKey });
  });
};

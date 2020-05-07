/* jshint node: true */
"use strict";

/**
 * Module dependencies.
 */
const check = require("express-validator");
const utils = require("../utilities/utils");

/**
 * Exported middleware functions
 */

// checks if password is valid
exports.checkPassword = [
  check
    .body("password")
    .exists()
    .withMessage("Bad input: Password.")
    .isString()
    .withMessage("Password must be a String.")
    .isLength({ min: 3 })
    .withMessage("Password not long enough."),

  function checkValidationResult(req, res, next) {
    const errors = check.validationResult(req);
    if (errors.isEmpty()) {
      return next();
    } else {
      const errMsg = errors
        .array({ onlyFirstError: true })
        .map((err) => {
          return err.msg;
        })
        .join("; ");
      return res.status(400).json(utils.parseErrorResp(400, errMsg));
    }
  },
];

// checks if email is valid
exports.checkEmail = [
  check
    .body("email")
    .exists()
    .withMessage("Email is not valid.")
    .isString()
    .withMessage("Email must be a String."),

  function checkValidationResult(req, res, next) {
    const errors = check.validationResult(req);
    if (errors.isEmpty()) {
      return next();
    } else {
      const errMsg = errors
        .array({ onlyFirstError: true })
        .map((err) => {
          return err.msg;
        })
        .join("; ");
      return res.status(400).json(utils.parseErrorResp(400, errMsg));
    }
  },
];

exports.checkCollectionQuery = [
  check
    .query("id")
    .exists()
    .withMessage("Collection id is missing.")
    .isString()
    .withMessage("Collection id must be a String."),

  function checkValidationResult(req, res, next) {
    const errors = check.validationResult(req);
    if (errors.isEmpty()) {
      return next();
    } else {
      const errMsg = errors
        .array({ onlyFirstError: true })
        .map((err) => {
          return err.msg;
        })
        .join("; ");
      return res.status(400).json(utils.parseErrorResp(400, errMsg));
    }
  },
];

exports.checkCollectionInsert = [
  check
    .body("title")
    .exists()
    .withMessage("Collection title is missing.")
    .isString()
    .withMessage("Collection title must be a String."),

  check
    .body("description")
    .exists()
    .withMessage("Collection description is missing.")
    .isString()
    .withMessage("Collection description must be a String."),

  function checkValidationResult(req, res, next) {
    const errors = check.validationResult(req);
    if (errors.isEmpty()) {
      return next();
    } else {
      const errMsg = errors
        .array({ onlyFirstError: true })
        .map((err) => {
          return err.msg;
        })
        .join("; ");
      return res.status(400).json(utils.parseErrorResp(400, errMsg));
    }
  },
];

exports.checkRatingInsert = [
  check.body("rating").exists().withMessage("Rating rating is missing."),

  function checkValidationResult(req, res, next) {
    const errors = check.validationResult(req);
    if (errors.isEmpty()) {
      return next();
    } else {
      const errMsg = errors
        .array({ onlyFirstError: true })
        .map((err) => {
          return err.msg;
        })
        .join("; ");
      return res.status(400).json(utils.parseErrorResp(400, errMsg));
    }
  },
];

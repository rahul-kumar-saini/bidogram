/* jshint node: true */
"use strict";

/**
 * Module dependencies.
 */

const mongoose = require("mongoose");
require("../models/collection");
const CollectionModel = mongoose.model("Collection");
const utils = require("../utilities/utils");

// Gets Collection by ID
exports.getCollection = function (req, res) {
  let id = mongoose.Types.ObjectId(req.params.id);
  CollectionModel.findById(id, function (err, data) {
    if (err) return res.status(500).json(utils.parseErrorResp(500, err));
    if (!data)
      return res
        .status(404)
        .json(utils.parseErrorResp(404, `Collection ${id} does not exist`));
    return res.json(data);
  });
};

exports.getCollections = function (req, res) {
  CollectionModel.find({}, function (err, data) {
    console.log(data);
    if (err) return res.status(500).json(utils.parseErrorResp(500, err));
    return res.json(data);
  });
};

// Adds Collection to DB
exports.addCollection = function (req, res) {
  let collTitle = req.body.title;
  let collDesc = req.body.description;
  let collCreator = req.email;
  let collTags = req.body.tags;
  let collGames = req.body.games;

  CollectionModel.findOne({title: collTitle, creator: collCreator}, function (err, locat) {
    if (err) return res.status(500).json(utils.parseErrorResp(500, "FindError" + err));
    if (locat) return res.status(409).end(`Collection ${collTitle} already exists`);
    // insert new user into database
    CollectionModel.updateOne({
      title: collTitle,
      creator: collCreator
    }, {
      title: collTitle,
      creator: collCreator,
      tags: collTags,
      description: collDesc,
      games: collGames
    }, {
      upsert: true
    }, function (err) {
      if (err) res.status(500).json(utils.parseErrorResp(500, err));
      else {
        CollectionModel.findOne({title: collTitle, creator: collCreator}, function (err, data) {
          const id = data._id;
          return res.status(200).json(utils.parseErrorResp(200, `Collection ${id} added successfully.`));
        });
      }
    });
  });
}

exports.deleteCollection = function (req, res) {
  let collTitle = req.body.title;
  let collCreator = req.email;
  CollectionModel.deleteOne(
    { title: collTitle, creator: collCreator },
    function (err, data) {
      if (err) return res.status(500).json(utils.parseErrorResp(500, err));
      console.log(data);
      return res
        .status(200)
        .json(
          utils.parseErrorResp(
            200,
            `Collection '${collTitle}' successfully deleted.`
          )
        );
    }
  );
};

/* jshint node: true */
"use strict";

/**
 * Module dependencies.
 */
const mongoose = require("mongoose");
require("../models/game");
const GameModel = mongoose.model("Game");
const utils = require("../utilities/utils");

// Gets Game by ID
exports.getGame = function (req, res) {
  let id = req.params.id;
  GameModel.findOne({ id: id }, function (err, data) {
    if (err) return res.status(500).json(utils.parseErrorResp(500, err));
    if (!data)
      return res
        .status(404)
        .json(utils.parseErrorResp(404, `Game ${id} does not exist`));
    return res.json(data);
  });
};

// Adds Game to DB
exports.addGame = function (req, res) {
  let gameId = req.body.id;
  let gameCover = req.body.cover;
  let gameFirstRel = req.body.first_release_date;
  let gameGameModes = req.body.game_modes;
  let gameGenres = req.body.genres;
  let gameCompanies = req.body.involved_companies;
  let gameKeywords = req.body.keywords;
  let gameName = req.body.name;
  let gamePlatforms = req.body.platforms;
  let gamePopularity = req.body.popularity;
  let gameRel = req.body.release_dates;
  let gameSlug = req.body.slug;
  let gameSimilarGames = req.body.similar_games;
  let gameSummary = req.body.summary;
  let gameThemes = req.body.themes;

  GameModel.findOne({ id: gameId }, function (err, locat) {
    if (err)
      return res
        .status(500)
        .json(utils.parseErrorResp(500, "FindError " + err));
    if (locat) return res.status(409).end(`Game ${locat.id} already exists`);
    // insert new user into database
    GameModel.updateOne(
      {
        id: gameId,
      },
      {
        id: gameId,
        cover: gameCover,
        firstRel: gameFirstRel,
        gameModes: gameGameModes,
        genres: gameGenres,
        companies: gameCompanies,
        keywords: gameKeywords,
        name: gameName,
        platforms: gamePlatforms,
        popularity: gamePopularity,
        releaseDates: gameRel,
        slug: gameSlug,
        similarGames: gameSimilarGames,
        summary: gameSummary,
        themes: gameThemes,
      },
      {
        upsert: true,
      },
      function (err) {
        if (err) res.status(500).json(utils.parseErrorResp(500, err));
        else {
          return res
            .status(200)
            .json(
              utils.parseErrorResp(200, `Game ${gameId} added successfully.`)
            );
        }
      }
    );
  });
};

exports.getGames = function (req, res) {
  GameModel.find({}, function (err, data) {
    if (err) return res.status(500).json(utils.parseErrorResp(500, err));
    if (!data)
      return res
        .status(404)
        .json(utils.parseErrorResp(404, `Games do not exist`));
    return res.json(data);
  });
};

// exports.getGameCover = function (req, res) {
//   Request.post({
//     "headers": {
//       'Accept': 'application/json',
//       'user-key': "8434734d9e1d2fca1ed29d8a6b7b5f8b"
//     },
//     "url": "https://api-v3.igdb.com/covers",
//     "body": "fields alpha_channel,animated,game,height,image_id,url,width; " +
//       "where id = " + req.query.id + ";"
//   }, (error, response, body) => {
//     if(error) {
//       console.log(error);
//     }
//     let gameCover = "http://" + JSON.parse(body)[0].url.slice(2);
//     gameCover = gameCover.replace("t_thumb","t_cover_big");
//     // console.log(gameCover);
//     return res.json(gameCover);
//   });
// };

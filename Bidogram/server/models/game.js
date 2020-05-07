const mongoose = require("mongoose");
const mapping = require("./model-mapping");

const GameSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  firstRel: {
    type: Date,
    required: true,
  },
  gameModes: {
    type: [String],
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  keywords: {
    type: [String],
    required: true,
  },
  companies: {
    type: [String],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  platforms: {
    type: [String],
    required: true,
  },
  popularity: {
    type: Number,
    required: true,
  },
  releaseDates: {
    type: [Date],
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  similarGames: {
    type: [String],
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  themes: {
    type: [String],
    required: true,
  },
  age_ratings: {
    type: [String],
    required: false,
  },
  alternative_names: {
    type: [String],
    required: false,
  },
  franchise: {
    type: String,
    required: false,
  },
  game_engines: {
    type: [String],
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
});

const Game = mongoose.model(mapping.GAME.model, GameSchema);
module.export = Game;

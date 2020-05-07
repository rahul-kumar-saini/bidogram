const mongoose = require("mongoose");
const mapping = require("./model-mapping");

const CollectionSchema = new mongoose.Schema({
  title: {
    // Title of the collection
    type: String,
    required: true,
  },
  creator: {
    // The id of the user that created this collection,
    // based off the User Schema's id field
    type: String,
    required: true,
  },
  tags: {
    // A list of tags for the collection
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  games: {
    type: [String],
    required: true
  }
});

const Collection = mongoose.model(mapping.COLLECTION.model, CollectionSchema);
module.export = Collection;

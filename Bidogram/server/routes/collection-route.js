const router = require("express").Router();
const validator = require("../middlewares/validation");
const collections = require("../controllers/collectionController");
const auth = require("../middlewares/authentication");

router.post(
  "/addCollection/",
  validator.checkCollectionInsert,
  auth.isAuthenticated,
  collections.addCollection
);
router.get("/getCollection/:id", auth.isAuthenticated, collections.getCollection);
router.get(
  "/getCollections/",
  auth.isAuthenticated,
  collections.getCollections
);
router.post(
  "/deleteCollection/",
  auth.isAuthenticated,
  collections.deleteCollection
);

module.exports = router;

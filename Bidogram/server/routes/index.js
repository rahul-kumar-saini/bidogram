const router = require("express").Router();
const userRoute = require("./user-route");
const collectionRoute = require("./collection-route");
const igdbRoute = require("./game-route");
const livestreamRoute = require("./livestream-route");

router.use("/users", userRoute);
router.use("/collections", collectionRoute);
router.use("/games", igdbRoute);
router.use("/livestreams", livestreamRoute);

module.exports = router;

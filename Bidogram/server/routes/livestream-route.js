const router = require("express").Router();
const validator = require("../middlewares/validation");
const livestreams = require("../controllers/liveStreamController");
const auth = require("../middlewares/authentication");

router.get("/info/", livestreams.info);

router.post("/start/", livestreams.start);

router.post("/end/", livestreams.end);

router.get('/thumbnail/', livestreams.thumbnail);

module.exports = router;

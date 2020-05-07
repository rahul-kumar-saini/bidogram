const router = require("express").Router();
const games = require("../controllers/gameController");
const auth = require("../middlewares/authentication");

router.get("/getGames/", games.getGames);
router.get("/getGame/:id", games.getGame);
router.post("/addGame/", auth.isAuthenticated, games.addGame);

module.exports = router;

const router = require("express").Router();
const validator = require("../middlewares/validation");
const users = require("../controllers/userController");
const auth = require("../middlewares/authentication");

router.post("/signin/", validator.checkEmail, users.signin);

router.post(
  "/signup/",
  validator.checkEmail,
  validator.checkPassword,
  users.signup
);

router.get("/signout/", auth.isAuthenticated, users.signout);

router.get("/", auth.isAuthenticated, users.getUser);

router.get("/streamkey/", users.getStreamKey);

router.get("/getUser/:id", auth.isAuthenticated, users.getUser);

router.get("/getUsers/", auth.isAuthenticated, users.getUsers);

router.put(
  "/setpassword/",
  validator.checkEmail,
  validator.checkPassword,
  auth.hasPermission,
  users.setPassword
);

router.put(
  "/sendpasswordreset/",
  validator.checkEmail,
  users.sendPasswordReset
);

router.put("/resetpassword/:token", users.resetPassword);

module.exports = router;

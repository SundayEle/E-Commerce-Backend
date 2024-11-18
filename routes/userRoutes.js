const { Router } = require("express");
const {
  signUpUser,
  signInUser,
  getOneUser,
} = require("../controller/userController");

const router = Router();

router.route("/signUpUser").post(signUpUser);
router.route("/signInUser").post(signInUser);
router.route("/getOneUser/:id").get(getOneUser);

module.exports = router;

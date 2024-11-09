const { Router } = require("express");
const { signUpUser, signInUser } = require("../controller/userController");

const router = Router();

router.route("/signUpUser").post(signUpUser);
router.route("/signInUser").post(signInUser);

module.exports = router;

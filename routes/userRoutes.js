const { Router } = require("express");
const signUpUser = require("../controller/userController");

const router = Router();

router.route("/signUpUser").post(signUpUser);

module.exports = router;

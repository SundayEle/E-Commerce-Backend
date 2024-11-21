const { Router } = require("express");
const {
  signUpUser,
  signInUser,
  getOneUser,
  getAllUsers,
  deleteAuser,
} = require("../controller/userController");

const router = Router();

router.route("/signUpUser").post(signUpUser);
router.route("/signInUser").post(signInUser);
router.route("/getOneUser/:id").get(getOneUser);
router.route("/getAllUsers").get(getAllUsers);
router.route("/deleteAuser/:id").delete(deleteAuser);

module.exports = router;

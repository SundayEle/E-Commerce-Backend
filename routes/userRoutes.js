const { Router } = require("express");
const {
  signUpUser,
  signInUser,
  getOneUser,
  getAllUsers,
  deleteAUser,
  updateUser,
} = require("../controller/userController");

const router = Router();

router.route("/signUpUser").post(signUpUser);
router.route("/signInUser").post(signInUser);
router.route("/getOneUser/:id").get(getOneUser);
router.route("/getAllUsers").get(getAllUsers);
router.route("/deleteAUser/:id").delete(deleteAUser);
router.route("/updateUser/:id").patch(updateUser);

module.exports = router;

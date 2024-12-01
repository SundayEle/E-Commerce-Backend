const { Router } = require("express");
const {
  signUpUser,
  signInUser,
  getOneUser,
  getAllUsers,
  deleteAUser,
  updateUser,
} = require("../controller/userController");
const authenticatingJWT = require("../middleware/jwtDecode");
const { isAdmin } = require("../middleware/protected");

const router = Router();

router.route("/signUpUser").post(signUpUser);
router.route("/signInUser").post(signInUser);
router.route("/getOneUser/:id").get(getOneUser);
router.get("/getAllUsers", authenticatingJWT, isAdmin, getAllUsers);
router.delete("/deleteAUser", authenticatingJWT, deleteAUser);
router.patch("/updateUser", authenticatingJWT, updateUser);

module.exports = router;

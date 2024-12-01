const { Router } = require("express");
const {
  createACategory,
  updateACategory,
  getAllCategory,
  getACategory,
  deleteACategory,
} = require("../controller/productCategoryController");
const { isAdmin } = require("../middleware/protected");
const authenticatingJWT = require("../middleware/jwtDecode");
const router = Router();

router.post("/createACategory", authenticatingJWT, isAdmin, createACategory);
router.get("/getAllCategory", authenticatingJWT, isAdmin, getAllCategory);
router.route("/getACategory/:id").get(getACategory);
router.delete(
  "/deleteACategory/:id",
  authenticatingJWT,
  isAdmin,
  deleteACategory
);
router.patch(
  "/updateACategory/:id",
  authenticatingJWT,
  isAdmin,
  updateACategory
);

module.exports = router;

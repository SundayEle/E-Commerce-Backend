const { Router } = require("express");
const {
  createACategory,
  updateACategory,
  getAllCategory,
  getACategory,
  deleteACategory,
} = require("../controller/productCategoryController");
const router = Router();

router.route("/createACategory").post(createACategory);
router.route("/getAllCategory").get(getAllCategory);
router.route("/getACategory/:id").get(getACategory);
router.route("/deleteACategory/:id").delete(deleteACategory);
router.route("/updateACategory/:id").patch(updateACategory);

module.exports = router;

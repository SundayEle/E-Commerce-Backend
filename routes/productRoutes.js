const { Router } = require("express");
const {
  createAProduct,
  getAllProducts,
  getAProduct,
  deleteAProduct,
  updateAProduct,
} = require("../controller/productController");

const router = Router();

router.route("/createAProduct").post(createAProduct);
router.route("/getAllProducts").get(getAllProducts);
router.route("/getAProduct/:id").get(getAProduct);
router.route("/deleteAProduct/:id").delete(deleteAProduct);
router.route("/updateAProduct/:id").patch(updateAProduct);

module.exports = router;

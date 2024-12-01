const { Router } = require("express");
const {
  createAProduct,
  getAllProducts,
  getAProduct,
  deleteAProduct,
  updateAProduct,
} = require("../controller/productController");
const authenticatingJWT = require("../middleware/jwtDecode");
const { isVendorOrAdmin } = require("../middleware/protected");

const router = Router();

router.post(
  "/createAProduct/:categoryId",
  authenticatingJWT,
  isVendorOrAdmin,
  createAProduct
);
router.route("/getAllProducts").get(getAllProducts);
router.route("/getAProduct/:id").get(getAProduct);
router.delete(
  "/deleteAProduct/:id",
  authenticatingJWT,
  isVendorOrAdmin,
  deleteAProduct
);
router.patch(
  "/updateAProduct/:id",
  authenticatingJWT,
  isVendorOrAdmin,
  updateAProduct
);

module.exports = router;

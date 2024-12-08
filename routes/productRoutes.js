const { Router } = require("express");
const {
  createAProduct,
  getAllProducts,
  getAProduct,
  deleteAProduct,
  updateAProduct,
} = require("../controller/productController");
const authenticatingJWT = require("../middleware/jwtDecode");
const { isVendorOrAdmin, isAdmin } = require("../middleware/protected");

const router = Router();

router.post(
  "/createAProduct",
  authenticatingJWT,
  isVendorOrAdmin,
  createAProduct
);
router.get("/getAllProducts", authenticatingJWT, isAdmin, getAllProducts);
router.get("/getAProduct/:id", authenticatingJWT, getAProduct);
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

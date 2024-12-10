const { Router } = require("express");
const productImageUpload = require("../config/multer");
const {
  createAProduct,
  getAllProducts,
  getAProduct,
  deleteAProduct,
  updateAProduct,
  searchProducts,
} = require("../controller/productController");
const authenticatingJWT = require("../middleware/jwtDecode");
const { isVendorOrAdmin, isAdmin } = require("../middleware/protected");

const router = Router();

router.post(
  "/createAProduct",
  authenticatingJWT,
  isVendorOrAdmin,
  productImageUpload,
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

router.get("/searchProducts", searchProducts);

module.exports = router;

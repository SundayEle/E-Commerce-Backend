const Router = require("express");
const {
  addProductToCart,
  removeProductFromCart,
  viewCart,
} = require("../controller/cartController");
const authenticatingJWT = require("../middleware/jwtDecode");
const router = Router();

router.post(
  "/addProductToCart/:productId",
  authenticatingJWT,
  addProductToCart
);
router.delete(
  "/removeProductFromCart/:productId",
  authenticatingJWT,
  removeProductFromCart
);
router.get("/viewCart", authenticatingJWT, viewCart);

module.exports = router;

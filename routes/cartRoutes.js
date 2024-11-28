const Router = require("express");
const {
  addProductToCart,
  removeProductFromCart,
  viewCart,
} = require("../controller/cartController");
const router = Router();

router.route("/addProductToCart/:productId").post(addProductToCart);
router.route("/removeProductFromCart/:productId").delete(removeProductFromCart);
router.route("/viewCart").get(viewCart);

module.exports = router;

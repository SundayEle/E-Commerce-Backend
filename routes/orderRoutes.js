const Router = require("express");
const {
  placeOrder,
  getOrders,
  updateOrderStatus,
} = require("../controller/orderController");
const authenticatingJWT = require("../middleware/jwtDecode");
const { isAdmin } = require("../middleware/protected");

const router = Router();

router.post("/placeOrder", authenticatingJWT, placeOrder);
router.get("/getOrders", authenticatingJWT, getOrders);
router.patch(
  "/updateOrderStatus/:orderId",
  authenticatingJWT,
  isAdmin,
  updateOrderStatus
);

module.exports = router;

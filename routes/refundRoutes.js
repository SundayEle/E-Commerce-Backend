const Router = require("express");

const {
  requestARefund,
  getAllRefundsRequest,
  updateRefundStatus,
} = require("../controller/refundController");

const authenticatingJWT = require("../middleware/jwtDecode");

const { isAdmin } = require("../middleware/protected");

const router = Router();

router.post("/requestARefund", authenticatingJWT, requestARefund);
router.get(
  "/getAllRefundsRequest",
  authenticatingJWT,
  isAdmin,
  getAllRefundsRequest
);
router.patch(
  "/updateRefundStatus/:refundId",
  authenticatingJWT,
  isAdmin,
  updateRefundStatus
);

module.exports = router;

const Router = require("express");
const {
  createANotification,
  markNotificationAsRead,
} = require("../controller/notificationController");
const { isAdmin } = require("../middleware/protected");
const authenticatingJWT = require("../middleware/jwtDecode");

const router = Router();

router.post(
  "/createANotification",
  authenticatingJWT,
  isAdmin,
  createANotification
);

router.patch(
  "/markNotificationAsRead/:notificationId",
  authenticatingJWT,
  markNotificationAsRead
);

module.exports = router;

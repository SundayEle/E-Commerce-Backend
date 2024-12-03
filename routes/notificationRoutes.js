const Router = require("express");
const createANotification = require("../controller/notificationController");
const { isAdmin } = require("../middleware/protected");
const authenticatingJWT = require("../middleware/jwtDecode");

const router = Router();

router.post(
  "/createANotification",
  authenticatingJWT,
  isAdmin,
  createANotification
);

module.exports = router;

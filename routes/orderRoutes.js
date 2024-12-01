const Router = require("express");
const placeOrder = require("../controller/orderController");
const authenticatingJWT = require("../middleware/jwtDecode");

const router = Router();

router.post("/placeOrder", authenticatingJWT, placeOrder);

module.exports = router;

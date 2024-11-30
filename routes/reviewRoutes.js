const Router = require("express");
const addReview = require("../controller/reviewController");
const authenticatingJWT = require("../middleware/jwtDecode");

const router = Router();

router.post("/addReview", authenticatingJWT, addReview);

module.exports = router;

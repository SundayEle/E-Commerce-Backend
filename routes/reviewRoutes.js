const Router = require("express");
const {
  addReview,
  updateReview,
  deleteReview,
  getReviews,
} = require("../controller/reviewController");
const authenticatingJWT = require("../middleware/jwtDecode");

const router = Router();

router.post("/addReview/:productId", authenticatingJWT, addReview);
router.patch(
  "/updateReview/:productId/:reviewId",
  authenticatingJWT,
  updateReview
);
router.delete("/deleteReview/:reviewId", authenticatingJWT, deleteReview);
router.get("/getReviews/:productId", authenticatingJWT, getReviews);

module.exports = router;

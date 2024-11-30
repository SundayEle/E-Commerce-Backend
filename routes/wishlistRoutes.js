const Router = require("express");
const {
  addWishlist,
  removeProductFromWishlist,
  getWishlist,
} = require("../controller/wishlistController");
const authenticatingJWT = require("../middleware/jwtDecode");

const router = Router();

router.post("/addWishlist/:productId", authenticatingJWT, addWishlist);
router.delete(
  "/removeProductFromWishlist/:productId",
  authenticatingJWT,
  removeProductFromWishlist
);
router.get("/getWishlist", authenticatingJWT, getWishlist);
module.exports = router;

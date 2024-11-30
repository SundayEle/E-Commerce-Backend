const { Router } = require("express");
const {
  createAProduct,
  getAllProducts,
  getAProduct,
  deleteAProduct,
  updateAProduct,
} = require("../controller/productController");
const authenticatingJWT = require("../middleware/jwtDecode");

const router = Router();

router.post("/createAProduct/:categoryId", authenticatingJWT, createAProduct);
router.route("/getAllProducts").get(getAllProducts);
router.route("/getAProduct/:id").get(getAProduct);
router.delete("/deleteAProduct/:id", authenticatingJWT, deleteAProduct);
router.patch("/updateAProduct/:id", authenticatingJWT, updateAProduct);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductByCategoryId,
} = require("../controller/productControllers");
const { verifyUser, verifyAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/multerMiddleware");


router.get("/", getAllProducts);

router.get("/category/:name", getProductByCategoryId);

router.post("/", upload.array("images", 5), createProduct);

router.put("/:id", upload.array("images", 5), updateProduct);

router.delete("/:id", deleteProduct);

router.get("/:id", getProductById);

module.exports = router;

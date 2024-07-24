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
const {
  createReviewProduct,
  updateProductReview,
  deleteProductReview,
  getAllReviewsProduct,
} = require("../controller/reviewController");

const { verifyUser, verifyAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/multerMiddleware");


router.get("/", getAllProducts);

router.get("/category/:name", getProductByCategoryId);

router.post("/", upload.array("images", 5), createProduct);

router.put("/:id", upload.array("images", 5), updateProduct);

router.delete("/:id", deleteProduct);

router.get("/:id", getProductById);


// reviews
router.post("/:id/reviews", verifyUser, createReviewProduct);

router.put("/:id/reviews/:reviewId", verifyUser, updateProductReview);

router.delete("/:id/reviews/:reviewId", verifyUser, deleteProductReview);

router.get("/:id/reviews", getAllReviewsProduct);

module.exports = router;

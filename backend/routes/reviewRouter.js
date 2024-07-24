const router = require("express").Router();
const {
  createReviewProduct,
  updateProductReview,
  deleteProductReview,
  getAllReviewsProduct,
} = require("../controller/reviewController");
const { verifyUser, verifyAdmin } = require("../middleware/authMiddleware");

router.post("/", [verifyUser], createReviewProduct);

router.put("/reviews/:reviewId", [verifyUser], updateProductReview);

router.delete("/reviews/:reviewId", [verifyUser], deleteProductReview);

router.get("/:id/reviews", getAllReviewsProduct);

module.exports = router;    

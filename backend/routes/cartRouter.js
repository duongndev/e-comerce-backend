const router = require("express").Router();
const {
  addToCart,
  getCart,
  updateQuantityCart,
  deleteItemCart,
} = require("../controller/cartController");
const { verifyUser } = require("../middleware/authMiddleware");

router.post("/", verifyUser, addToCart);

router.put("/:id", verifyUser, updateQuantityCart);

router.get("/:id", verifyUser, getCart);

router.delete("/remove", verifyUser, deleteItemCart);

module.exports = router;

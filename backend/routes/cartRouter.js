const router = require("express").Router();
const {
  addToCart,
  getCart,
  updateQuantityCart,
  deleteItemCart,
} = require("../controller/cartController");
const { verifyUser } = require("../middleware/authMiddleware");

router.get("/", getCart);

router.post("/", addToCart);

router.put("/:id", [verifyUser], updateQuantityCart);

router.get("/user/:id", [verifyUser], getCart);

router.delete("/remove", [verifyUser], deleteItemCart);

module.exports = router;

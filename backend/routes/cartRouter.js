const router = require("express").Router();
const {
  addToCart,
  getCart,
  updateQuantityCart,
  deleteItemCart,
  incrementQuantity,
  decrementQuantity,
} = require("../controller/cartController");
const { verifyUser } = require("../middleware/authMiddleware");

router.get("/",  getCart);

router.post("/", [verifyUser], addToCart);

router.put("/:id", [verifyUser], updateQuantityCart);

router.get("/user/:id", [verifyUser], getCart);

router.put("/increment/:id", [verifyUser], incrementQuantity);

router.put("/decrement/:id", [verifyUser], decrementQuantity);

router.delete("/remove/:id", [verifyUser], deleteItemCart);

module.exports = router;

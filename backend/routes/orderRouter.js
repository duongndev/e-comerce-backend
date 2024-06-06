const router = require("express").Router();
const {
    createOrder,
    updateOrder,
} = require("../controller/orderController");
const { verifyUser } = require("../middleware/authMiddleware");

router.post("/", [verifyUser], createOrder);

router.put("/:id", [verifyUser], updateOrder);

module.exports = router;
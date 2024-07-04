const router = require("express").Router();
const {
    createOrder,
    updateOrder,
    getOrderById,
    getAllOrders,
    getAllOrdersByUserId,
    getOrdersByStatusOfUser,
} = require("../controller/orderController");
const { verifyUser, verifyAdmin } = require("../middleware/authMiddleware");

router.get("/", [verifyAdmin], getAllOrders);

router.post("/", [verifyUser], createOrder);

router.put("/:id", [verifyAdmin], updateOrder);


router.get("/:id", [verifyUser], getOrderById);

router.get("/user/:id", [verifyUser], getAllOrdersByUserId);

router.get("/status/:id", [verifyUser], getOrdersByStatusOfUser);


module.exports = router;
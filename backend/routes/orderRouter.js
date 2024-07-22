const router = require("express").Router();
const {
    createOrder,
    updateOrder,
    getOrderById,
    getAllOrders,
    getAllOrdersByUserId,
    getOrdersByStatusOfUser,
    getOrdersByStatus,
} = require("../controller/orderController");
const { verifyUser, verifyAdmin } = require("../middleware/authMiddleware");


router.get("/", getAllOrders);
router.put("/:id", [verifyAdmin], updateOrder);

router.get("/status", getOrdersByStatus);


router.post("/", [verifyUser], createOrder);

router.get("/:id", [verifyUser], getOrderById);

router.get("/user/:id", [verifyUser], getAllOrdersByUserId);

router.get("/user/:id/status", [verifyUser], getOrdersByStatusOfUser);





module.exports = router;
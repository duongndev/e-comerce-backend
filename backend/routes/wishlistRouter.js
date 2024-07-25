const router = require("express").Router();
const {
    addToWishlist,
    removeProductFromWishlist,
    getWishlist,
} = require("../controller/wishlistController");
const { verifyUser } = require("../middleware/authMiddleware");


router.post("/", [verifyUser], addToWishlist);

router.delete("/", [verifyUser], removeProductFromWishlist);

router.get("/", [verifyUser], getWishlist);


module.exports = router
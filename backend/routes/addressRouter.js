const router = require("express").Router();
const {
  getAllAddresses,
  createdAddresses,
  updateAddresses,
  deleteAddresses,
  getAddressById,
  getAddressesByUserId,
} = require("../controller/addressController");
const { 
    verifyUser,
 } = require("../middleware/authMiddleware");

router.get("/", verifyUser, getAllAddresses);

router.post("/", verifyUser, createdAddresses);

router.put("/:id", verifyUser, updateAddresses);

router.delete("/:id", verifyUser, deleteAddresses);

router.get("/:id", verifyUser, getAddressById);

router.get("/user/:id", verifyUser, getAddressesByUserId);

module.exports = router;

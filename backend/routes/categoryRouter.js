const router = require("express").Router();
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
} = require("../controller/categoryController");
const upload = require("../middleware/multerMiddleware");
const { verifyUser, verifyAdmin } = require("../middleware/authMiddleware");

router.get("/", getAllCategories);

router.post("/", upload.single("image"), createCategory);

router.get("/:id", getCategoryById);

router.put("/:id", upload.single("image"), updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;

const router = require("express").Router();
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  getProductByCategory,
} = require("../controller/categoryController");

const {
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoryById,
} = require("../controller/subController");

const upload = require("../middleware/multerMiddleware");
const { verifyUser, verifyAdmin } = require("../middleware/authMiddleware");

// category
router.get("/", getAllCategories);

router.post("/", upload.single("image"), createCategory);

router.get("/:id/products", getProductByCategory);

router.get("/:id", getCategoryById);

router.put("/:id", upload.single("image"), updateCategory);

router.delete("/:id", deleteCategory);

// subcategory
router.get("/:id/subcategories", getAllSubCategories);

router.post("/:id/subcategories", upload.single("image"), createSubCategory);

router.get("/:id/subcategories/:id", getSubCategoryById);

router.put("/:id/subcategories/:id", upload.single("image"), updateSubCategory);

router.delete("/:id/subcategories/:id", deleteSubCategory);

module.exports = router;

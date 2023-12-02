const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  
} = require("../controller/HouseCategory");

const CategoryRouter = require("express").Router();

CategoryRouter.post("/create_category", createCategory);
CategoryRouter.get("/get_all_category", getAllCategories);
CategoryRouter.get("/get_category_by_id/:id", getCategoryById);
CategoryRouter.put("/update_category/:id", updateCategory);
CategoryRouter.delete("/delete_category/:id", deleteCategory);

module.exports = CategoryRouter;

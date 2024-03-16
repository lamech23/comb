const express = require("express");

const {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/category.js");

const CategoryRoutes = express.Router();

CategoryRoutes.get("/fetch", getAllCategory);
CategoryRoutes.post("/", createCategory);
CategoryRoutes.patch("/:id", updateCategory);
CategoryRoutes.delete("/:id", deleteCategory);

module.exports = CategoryRoutes;

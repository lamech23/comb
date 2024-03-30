const express = require("express");

const {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/category.js");

const CategoryRoutes = express.Router();
const { hasAdmin } = require("../middlleware/checkRoles");


CategoryRoutes.get("/fetch", getAllCategory);
CategoryRoutes.post("/",  hasAdmin, createCategory);
CategoryRoutes.patch("/:id", hasAdmin,updateCategory);
CategoryRoutes.delete("/:id", hasAdmin, deleteCategory);

module.exports = CategoryRoutes;

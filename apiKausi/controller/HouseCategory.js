const { body, validationResult } = require("express-validator");
const Category = require("../models/category.js");

const createCategory = async (req, res) => {
  try {
    // Validate the "name" field, ensuring it is not empty
    body("name").notEmpty().withMessage("Category name is required");

    const errors = validationResult(req);

    // Check if there are validation errors; if so, return a 400 response
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { name } = req.body;

    // Check if the "name" field is empty or contains only whitespace
    if (!name || name.trim() === "") {
      return res.status(400).send({ error: "Category name must be included" });
    }

    // Create a new category in the database
    const category = await Category.create({
      name: name,
    });

    // Send a successful response with the created category object
    res.status(200).send(category);
  } catch (error) {
    // Handle any errors that occur during the category creation process
    res.status(500).send({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    // Retrieve all categories from the database
    const categories = await Category.findAll();

    // Send a successful response with the retrieved categories
    res.status(200).send(categories);
  } catch (error) {
    // Handle any errors that occur during the category retrieval process
    res.status(500).send({ message: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    // Retrieve the category with the specified ID from the database
    const category = await Category.findByPk(req.params.id);

    // Check if the category was found; if not, return a 404 response
    if (!category) {
      return res.status(404).send({ error: "Category not found" });
    }

    // Send a successful response with the retrieved category
    res.status(200).send(category);
  } catch (error) {
    // Handle any errors that occur during the category retrieval process
    res.status(500).send({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    // Retrieve the category with the specified ID from the database
    const category = await Category.findByPk(req.params.id);

    // Check if the category was found; if not, return a 404 response
    if (!category) {
      return res.status(404).send({ error: "Category not found" });
    }

    // Update the category with the specified ID in the database
    await category.update(req.body);

    // Send a successful response
    res.status(200).send();
  } catch (error) {
    // Handle any errors that occur during the category update process
    res.status(500).send({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    // Retrieve the category with the specified ID from the database
    const category = await Category.findByPk(req.params.id);

    // Check if the category was found; if not, return a 404 response
    if (!category) {
      return res.status(404).send({ error: "Category not found" });
    }

    // Delete the category with the specified ID from the database
    await category.destroy();

    // Send a successful response
    res.status(200).send();
  } catch (error) {
    // Handle any errors that occur during the category deletion process
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};

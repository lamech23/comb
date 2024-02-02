const express = require("express");

const {
    getAllPropertyType,
  createPropertyType,
  updatePropertyType,
  deletePropertyType
} = require("../controllers/propertyTypeController");

const CategoryRoutes = express.Router();

CategoryRoutes.get("/fetch", getAllPropertyType);
CategoryRoutes.post("/", createPropertyType);
CategoryRoutes.patch("/:id", updatePropertyType);
CategoryRoutes.delete("/:id",   deletePropertyType,
);

module.exports = CategoryRoutes;

const express = require("express");
const {
  getAllTenants,
  registerTenant,
  getTenantsForLandowner,
} = require("../controller/TenantsRegistration");

const { isAdmin } = require("../middleware/checkRoles");
const { verifyToken } = require("../middleware/auth");


const TenantsRegistrationRouter = express.Router();

TenantsRegistrationRouter.post("/create_tenants_details", registerTenant);
TenantsRegistrationRouter.get(
  "/get_tenants_per_landowner",
  getTenantsForLandowner
);
TenantsRegistrationRouter.get("/get_all_tenants", getAllTenants);

module.exports = TenantsRegistrationRouter;

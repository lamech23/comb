const { login } = require("../auth/login");
const { register } = require("../auth/register");
const {
  getRoles,
  deleteRole,
  create_users_roles,
} = require("../auth/roles");
const { verifyToken } = require("../middleware/auth");
const { createRole } = require("../auth/roles");
const { isAdmin } = require("../middleware/checkRoles");
const {
  forgotPassword,
  resetPassword,
} = require("../auth/accRecovery");

const express = require("express");
const AuthRouter = express.Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.post("/create-role", createRole);
AuthRouter.post("/forgot_password", forgotPassword);
AuthRouter.post("/reset_password/:token", resetPassword);
AuthRouter.get("/get-roles", verifyToken,  getRoles);
AuthRouter.delete("/delete_roles/:id", verifyToken, isAdmin, deleteRole);
AuthRouter.post("/create_users_roles", create_users_roles);

module.exports = AuthRouter;

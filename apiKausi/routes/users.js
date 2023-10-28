const {
  getUsers,
  getUserById,
  updateUser,
  Deactivate,
  Active,
  updatePasswordAndEmail,
  getActiveAndDeActiveUsers,
  DeleteUserAcc,
  checkRolesForAccessingSomeFunctionalities,
} = require("../controller/users");

const { isAdmin } = require("../middleware/checkRoles");
const { verifyToken } = require("../middleware/auth");

const upload = require("../middleware/imageUpload");

const express = require("express");
const UsersRouter = express.Router();

// Apply verifyToken middleware to all routes within this router
UsersRouter.use(verifyToken);

UsersRouter.get("/get_users", verifyToken, isAdmin, getUsers);
UsersRouter.get("/ActiveAndDeActive", getActiveAndDeActiveUsers);
UsersRouter.get("/get_single_user/:id", getUserById);
UsersRouter.patch("/update_user/:id", verifyToken, isAdmin, updateUser);
UsersRouter.patch("/Deactivate/:id", verifyToken, isAdmin, Deactivate);
UsersRouter.patch("/Active/:id", verifyToken, isAdmin, Active);
UsersRouter.patch("/update_password_email/:id", updatePasswordAndEmail);
UsersRouter.patch("/replace_image", upload, replaceImages);
UsersRouter.patch("/replace_cover_image", upload, replaceCoverImages);
UsersRouter.get("/get_visited_user/:id", getVisitedUser);
UsersRouter.patch("/delete_user/:id", DeleteUserAcc);
UsersRouter.get(
  "/check_roles/:id",
  verifyToken,
  checkRolesForAccessingSomeFunctionalities
);

module.exports = UsersRouter;

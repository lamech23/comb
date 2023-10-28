const { body, validationResult } = require("express-validator");
const Users = require("../models/user/users");
const Roles = require("../models/user/roles");
const crypto = require("crypto");
const { issueAccessToken } = require("../middleware/auth");
require("dotenv").config();

const bcrypt = require("bcrypt");



const register = async (req, res) => {
  try {
    // Validate and normalize the email field
    await body("email").isEmail().normalizeEmail().run(req);

    // Check if the 'username' field has a minimum length of 4 characters
    await body("username").isLength({ min: 4 }).run(req);

    // Check if the 'password' field has a minimum length of 6 characters
    await body("password").isLength({ min: 6 }).run(req);

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure values from the request body
    const { email, role, firstName, lastName, username, password } = req.body;

    // Check if the email is already registered in the database
    const isEmailRegistered = await Users.findOne({
      where: {
        email: email,
      },
    });

    const isUsernameRegistered = await Users.findOne({
      where: {
        username: username,
      },
    });

    if (isEmailRegistered) {
      return res.status(409).json({ error: "Email already registered" });
    }

    if (isUsernameRegistered) {
      return res.status(402).json({ error: "Username has been registered" });
    }

   
    // Initialize an empty array for user roles
    let roles = [];

    // If 'role' is provided, query the database for role information
    if (role) {
      roles = await Roles.findAll({
        where: {
          role: Array.isArray(role) ? role : [role],
        },
      });
    }

    // Query the database for the default user role ('user')
    let defaultRole = await Roles.findOne({
      where: {
        role: "user",
      },
    });

    // If defaultRole doesn't exist, create it
    if (!defaultRole) {
      defaultRole = await Roles.create({
        role: "user",
        role_number: 1,
      });
    }

    // Hash the user's password for storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await Users.create({
      email,
      username,
      password: hashedPassword,
    });

    // Set the user's roles based on the retrieved roles or defaultRole
    await user.setRoles(roles.length > 0 ? roles : [defaultRole]);

    // Retrieve the user's roles and extract role names
    const userRole = await user.getRoles();
    const roleNames = userRole.map((role) => role.role);

    // Issue access tokens for the user
    const tokens = issueAccessToken(
      user.id,
      user.email,
      roleNames
    );

    // Update the user's refreshToken in the database
    user.refreshToken = tokens.refreshToken;
    await user.save();

    // Send a success response
    res.json({
      message: "User created successfully and registration link sent to email",
    });
  } catch (error) {
    // Handle any errors that occur during registration
    console.error("Error in register:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  register,
};

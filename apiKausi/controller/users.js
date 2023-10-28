const Users = require("../models/user/users");
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const Roles = require("../models/user/roles");
const bcrypt = require("bcrypt");


const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll(); // Fetch all users from the database
    res.status(200).send(users);
    // Return all users as JSON response to the client side application making the request to this API endpoint (route) with the GET method .
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getActiveAndDeActiveUsers = async (req, res) => {
  try {
    const users = await Users.findAll(); // Fetch all users from the database

    // Separate active and inactive users
    const activeUsers = users.filter((user) => user.isActive === true);
    const inactiveUsers = users.filter((user) => user.isActive === false);

    const responseData = {
      activeUsers: activeUsers,
      inactiveUsers: inactiveUsers,
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const accessToken = req.user;
    const user_id = accessToken.userId.id;

    const user = await Users.findByPk(user_id, {
      // Fetch the user by primary key (id)
      include: [
        // Include the Roles model to fetch the user roles
        {
          model: Roles,
          through: "UserRoles",
        },
      ],
    });

    if (user) {
      // Extract the role names from the user object
      const roleNames = user.roles.map((role) => role.role);

      res.json({ roleNames, user }); // Sending only the role names in the response and the user data
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const accessToken = req.user;

    const user_id = accessToken.userId.id;

    const user = await Users.findByPk(user_id);

    // Retrieve the user's existing data from the database
    const existingData = user.toJSON();

    // Update the user data with the fields provided in the request body
    const updatedData = {
      ...existingData, // Spread operator copies existingData into the new object so we don't lose any fields already in the database (like password, etc.) that we didn't include in the request body from the client side
      first_name: req.body.first_name || existingData.first_name,
      last_name: req.body.last_name || existingData.last_name,
      email: req.body.email || existingData.email,
      username: req.body.username || existingData.username,
      phone: req.body.phone || existingData.phone,
      gender: req.body.gender || existingData.gender,
  
    };

    // Update the user record in the database with the new data
    await user.update(updatedData);

    res.json({ message: "User data updated successfully", data: updatedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Define an asynchronous function called updatePassword that takes 'req' and 'res' parameters.
const updatePasswordAndEmail = async (req, res) => {
  // Retrieve the user's token from the request object.
  const token = req.user;
  // Extract the user's ID from the token.
  const userId = token.userId.id;
  // Extract the 'password' and 'confirmPassword' fields from the request body.
  const { password, confirmPassword, email } = req.body;

  // Check if the password and confirmPassword fields are empty.
  if (!password || !confirmPassword || !email) {
    // If either of the fields is empty, return a 400 Bad Request response.
    return res.status(400).json({
      success: false,
      message: "email, Password and Confirm Password are required",
    });
  }

  // Check if the password is less than 6 characters.
  if (password !== confirmPassword) {
    // If the password is less than 6 characters, return a 400 Bad Request response.
    return res.status(401).json({
      success: false,
      message: "Password Does Not Match",
    });
  }

  try {
    // Check if the email already exists in the database.
    const userWithEmail = await Users.findOne({ where: { email: email } });

    if (userWithEmail && userWithEmail.id !== userId) {
      // If a user with the same email exists and it's not the current user's email, return an error.
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Encrypt the password using bcrypt with a cost factor of 10.
    const encryptPassword = await bcrypt.hash(password, 10);

    // Update the user's password and email in the database.
    const updatedUser = await Users.update(
      {
        password: encryptPassword,
        email: email,
      },
      { where: { id: userId } }
    );

    // Respond with a 200 OK status and a success message along with the updated user data.
    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error.message);
    // Handle any errors that occur during the password update process and respond with an error message.
    res.status(500).json({ message: error.message });
  }
};

const Active = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findOne({ where: { id: id } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    const updateStatus = await Users.update(
      { isActive: true },
      { where: { id: id } }
    );

    return res.status(200).json({ success: true, user: updateStatus });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const Deactivate = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findOne({ where: { id: id } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    const updateStatus = await Users.update(
      { isActive: false },
      { where: { id: id } }
    );

    return res.status(200).json({ success: true, user: updateStatus });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const DeleteUserAcc = async (req, res) => {
  const accessToken = req.user;
  const user_id = accessToken.userId.id;

  console.log(user_id);

  try {
    const user = await Users.findOne({ where: { id: user_id } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    const updateStatus = await Users.update(
      { isActive: false },
      { where: { id: user_id } }
    );

    return res.status(200).json({ success: true, user: updateStatus });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const checkRolesForAccessingSomeFunctionalities = async (req, res) => {
  try {
    const accessToken = req.user;
    const user_id = accessToken.userId.id;

    const user = await Users.findByPk(user_id, {
      // Fetch the user by primary key (id)
      include: [
        // Include the Roles model to fetch the user roles
        {
          model: Roles,
          through: "UserRoles",
        },
      ],
    });

    if (user) {
      // Extract the role names from the user object
      const roleNames = user.roles.map((role) => role.role);

      res.json({ roleNames, user }); // Sending only the role names in the response and the user data
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  updatePasswordAndEmail,
  Active,
  Deactivate,
  getActiveAndDeActiveUsers,
  DeleteUserAcc,
  checkRolesForAccessingSomeFunctionalities
};

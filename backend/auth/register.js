const { body, validationResult } = require("express-validator");
const Users = require("../models/UserModels.js");
const crypto = require("crypto");
const { issueAccessToken } = require("../middlleware/requireAuth");
const { validatePassword, validateEmail, validateUsername} = require('../middlleware/emailAndPasswordCheck');


require("dotenv").config();

const bcrypt = require("bcrypt");
const path = require("path");

require("dotenv").config();

const baseUrl = process.env.BASE_URL;

const register = async (req, res) => {
    try {
        // Destructure values from the request body
        const { email,username, password } = req.body;

        const emailError = await validateEmail(email);

        if (emailError) {
            return res.status(400).json({ error: emailError });
        }

        const usernameError = await validateUsername(username);

        if (usernameError) {
            return res.status(400).json({ error: usernameError });
        }

        const passwordError = validatePassword(password);

        if (passwordError) {
            return res.status(400).json({ error: passwordError });
        }

        const registrationToken = crypto.randomBytes(32).toString("hex");

        // Initialize an empty array for user roles
        let roles = "user";

        // Hash the user's password for storage
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const user = await Users.create({
            email:email,
            username : username,
            password: hashedPassword,
            role:roles,
            registrationToken: registrationToken,
            Active: "inActive",
            profileImage: `${baseUrl}/${path.join(
                "Images",
                "blank-profile-picture-gab6c06e5a_1920.png"
            )}`,
        });

        // // Update the user's refreshToken in the database
        // user.refreshToken = tokens.refreshToken;
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
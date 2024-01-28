const { body, validationResult } = require("express-validator");
const { Op } = require("sequelize");
const Users = require("../models/UserModels.js");
const bcrypt = require("bcrypt");

require("dotenv").config();
const { issueAccessToken, issueRefreshToken } = require("../middlleware/requireAuth");

const  loginUser = async (req, res) => {
    try {
        await body("emailOrUsername").isLength({ min: 3 }).trim().escape().run(req);
        await body("password").isLength({ min: 6 }).run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { emailOrUsername, password } = req.body;

        const user = await Users.findOne({
            where: {
                [Op.or]: [
                    { username: emailOrUsername },
                    { email: emailOrUsername }
                ],
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.active == "active") {
            return res.status(403).json({ error: "Your account is inactive" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const data = {
            id: user.id,
            role:user.role
        };

        const accessToken = issueAccessToken(data);

        const refreshToken = issueRefreshToken(data.id);

        user.refreshToken = refreshToken;

        await user.save();

        res.cookie("user", JSON.stringify(data), {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.json({
            accessToken,
        });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const logout = async (req, res) => {
    res
        .clearCookie("user", {
            secure: true,
            sameSite: "none",

        })
        .status(200)
        .json({
            success: true,
            message: "succesfuly logged  out",
        });
};

module.exports = {  loginUser, logout };
const { body, validationResult } = require("express-validator");
const Users = require("../models/UserModels.js");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {checkIfEmailExists,validateEmail,validatePassword} = require("../middlleware/emailAndPasswordCheck");

require("dotenv").config();

const host = process.env.HOST;
const port = process.env.PORT;
const secure = process.env.SECURE;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;


const forgotPassword = async (req, res) => {

    const { email } = req.body;

    const emailError = await checkIfEmailExists(email);

    if (emailError) {
        return res.status(400).json({ error: emailError });
    }

    try {
        const user = await Users.findOne({ where: { email: email } });
        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Email Does Not Exist",
            });
        } else {
            // Generate a JWT token for password reset

            // const token = jwt.sign(
            //     { userId: user.id },
            //     process.env.ACCESS_TOKEN_SECRET,
            //     {
            //         expiresIn: "1440m",
            //     }
            // );


            // const transporter = nodemailer.createTransport({
            //     host: host,
            //     port: port,
            //     secure: secure,
            //     auth: {
            //         user: smtpUser,
            //         pass: smtpPass,
            //     },
            // });

            // await transporter.sendMail({
            //     from: smtpUser,
            //     to: email,
            //     subject: "Reset Password",
            //     html: `<p>You requested to reset your password. Click on the following link to proceed:
            //    <a href="http://localhost:3000/reset-password/${user.id}/${token}">Reset Password</a>. This link will expire in 1440  minutes.</p>`,
            // });


            res.status(200).json({ message: "Recovery email sent" });
        }
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};


const resetPassword = async (req, res) => {

    const { newPassword, confirmPassword } = req.body;

    const passwordError = validatePassword(newPassword,confirmPassword );

    if (passwordError) {
        return res.status(400).json({ error: passwordError });
    }

    const { token } = req.params;

    if (newPassword === confirmPassword) {
        try {
            const decryptedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            const userId = decryptedToken.userId;

            const encryptPassword = await bcrypt.hash(newPassword, 10);
            const updatedUser = await Users.update(
                { password: encryptPassword },
                { where: { id: userId } }
            );

            res.status(200).json({
                success: true,
                user: updatedUser,
            });
        } catch (error) {
            res
                .status(402)
                .json({ success: false, message: "Invalid or expired token" });
        }
    } else {
        // this is when  passwords do not match, return an error
        return res.status(401).json({
            success: false,
            message: "Password Does Not Match",
        });
    }
};


const updateUserEmail = async (req, res) => {
    const { id } = req.params;
    const {email} = req.body;

    const emailError = await validateEmail(email);

    if (emailError) {
        return res.status(400).json({ error: emailError });
    }

    const userEmail = await users.update(
         email,
        { where: { id: id } }
    );

    if (!userEmail) {
        return res.status(400).json({ msg: "nop" });
    }
    res.status(200).json(userEmail);
};


// Export the functions for the  routes
module.exports = {
    forgotPassword,
    resetPassword,
    updateUserEmail
};
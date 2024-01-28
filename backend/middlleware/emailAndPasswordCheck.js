const Users = require("../models/UserModels.js");
const validatePassword = (password) => {
    const minLength = 8;
    const requiresUppercase = true;
    const requiresLowercase = true;
    const requiresNumber = true;
    const requiresSpecialCharacter = true;
    const specialCharacters = '!@#$%^&*()_-+=<>?/[]{}.,';

    // Check minimum length
    if (password.length < minLength) {
        return 'Password is too short';
    }

    // Check for uppercase requirement
    if (requiresUppercase && !/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase letter';
    }

    // Check for lowercase requirement
    if (requiresLowercase && !/[a-z]/.test(password)) {
        return 'Password must contain at least one lowercase letter';
    }

    // Check for number requirement
    if (requiresNumber && !/\d/.test(password)) {
        return 'Password must contain at least one number';
    }

    // Check for special character requirement
    if (requiresSpecialCharacter && !new RegExp(`[${specialCharacters.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}]`).test(password)) {
        return 'Password must contain at least one special character';
    }

    // Password is considered strong
    return null;
};


const validateEmail = async (email) => {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return 'Invalid email address';
    }

    // Check if the email is already registered in the database
    const isEmailRegistered = await Users.findOne({
        where: {
            email: email,
        },
    });

    if (isEmailRegistered) {
        return 'Email already registered';
    }

    // Email is considered valid
    return null;
};


const checkIfEmailExists = async (email) => {
    // Check if the email is already registered in the database
    const isEmailRegistered = await Users.findOne({
        where: {
            email: email,
        },
    });

    if (!isEmailRegistered) {
        return 'Email Not found ';
    }

    // Email is considered valid
    return null;
}


const validateUsername = async (username) => {
    // Basic validation for username
    // const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    //
    // if (!usernameRegex.test(username)) {
    //     return 'Invalid username format';
    // }

    // Check if the username is already registered in the database
    const isUsernameRegistered = await Users.findOne({
        where: {
            username: username,
        },
    });

    if (isUsernameRegistered) {
        return 'Username already registered';
    }

    // Username is considered valid
    return null;
};


module.exports = {
    validatePassword,
    validateEmail,
    validateUsername,
    checkIfEmailExists
};

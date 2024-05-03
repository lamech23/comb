const express = require("express");
const router =express.Router()


const {
    createAccount
} = require("../controllers/accountController.js");

const { verifyToken } = require("../middlleware/token.js");

const {singleUpload} = require("../middlleware/upload.js")


router.post("/update-account", verifyToken, singleUpload,  createAccount);


module.exports = router;
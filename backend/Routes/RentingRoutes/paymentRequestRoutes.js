const express =require('express')
const router =express.Router()

const{ 
    addPayment,
    getAllPaymentsForAdminSide
} =require('../../controllers/Renting/paymentController')
const {hasAdmin} = require("../../middlleware/checkRoles");
const { verifyToken } = require('../../middlleware/token');
const { singleUpload } = require("../../middlleware/upload");


router.post('/request-payment', verifyToken, singleUpload,  addPayment)
router.get('/open-payments', verifyToken, hasAdmin,  getAllPaymentsForAdminSide)

module.exports=router
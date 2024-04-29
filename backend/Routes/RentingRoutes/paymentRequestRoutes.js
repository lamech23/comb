const express =require('express')
const router =express.Router()

const{ 
    addPayment,
    getAllPaymentsForAdminSide,
    singlePaymentsForAdminSide,
    updatePaymentStatus,
    paymentsRequestForSpecifcUser
} =require('../../controllers/Renting/paymentController')
const {hasAdmin} = require("../../middlleware/checkRoles");
const { verifyToken } = require('../../middlleware/token');
const { singleUpload } = require("../../middlleware/upload");


router.post('/request-payment', verifyToken, singleUpload,  addPayment)
router.get('/open-payments', verifyToken, hasAdmin,  getAllPaymentsForAdminSide)
router.get('/single-payments/:id', verifyToken, hasAdmin,  singlePaymentsForAdminSide)
router.patch('/confirm-payment/:id', verifyToken, hasAdmin,  updatePaymentStatus)
router.get('/user-payment', verifyToken,  paymentsRequestForSpecifcUser)

module.exports=router
const express =require('express')
const router =express.Router()

const{ 
    tenatRegistration,
    tentantUpdating,
    paymentsCreations,
    updateWaterBill,
    getPayments,
    deleteTenant
} =require('../../controllers/Renting/TenantRegistrationController')
const {requireAuth} =require('../../middlleware/requireAuth')

const { hasAdmin ,hasAgent } = require("../../middlleware/checkRoles");
const { verifyToken } = require('../../middlleware/token');



router.post('/registerTenant', verifyToken,hasAdmin , tenatRegistration)
router.post('/registerPayment',verifyToken, hasAdmin, paymentsCreations)
router.patch('/change/:id',  verifyToken, hasAdmin, tentantUpdating)
router.put('/updateWaterBill',verifyToken,hasAdmin  ,  updateWaterBill)
router.get('/fetchPayment/',verifyToken, hasAdmin  , getPayments)
router.delete('/removeTenant/',verifyToken, hasAdmin  , deleteTenant)


module.exports= router ;
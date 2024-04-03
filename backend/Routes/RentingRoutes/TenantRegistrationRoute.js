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



router.post('/registerTenant', verifyToken,hasAdmin ,hasAgent , tenatRegistration)
router.post('/registerPayment',verifyToken, hasAdmin ,hasAgent , paymentsCreations)
router.patch('/change/:id',  verifyToken, hasAdmin ,hasAgent ,requireAuth, tentantUpdating)
router.put('/updateWaterBill',verifyToken,hasAdmin ,hasAgent ,  updateWaterBill)
router.get('/fetchPayment/',verifyToken, hasAdmin ,hasAgent , getPayments)
router.delete('/removeTenant/',verifyToken, hasAdmin ,hasAgent , deleteTenant)


module.exports= router ;
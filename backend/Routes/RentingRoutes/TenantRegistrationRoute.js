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



router.post('/registerTenant', hasAdmin ,hasAgent , tenatRegistration)
router.post('/registerPayment', hasAdmin ,hasAgent , paymentsCreations)
router.patch('/change/:id', hasAdmin ,hasAgent ,requireAuth, tentantUpdating)
router.put('/updateWaterBill',hasAdmin ,hasAgent ,  updateWaterBill)
router.get('/fetchPayment/',hasAdmin ,hasAgent ,  getPayments)
router.get('/fetchPayment/', hasAdmin ,hasAgent , getPayments)
router.delete('/removeTenant/',hasAdmin ,hasAgent , deleteTenant)


module.exports= router ;
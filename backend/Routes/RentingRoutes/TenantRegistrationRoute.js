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




router.post('/registerTenant',  tenatRegistration)
router.post('/registerPayment',  paymentsCreations)
router.patch('/change/:id',requireAuth, tentantUpdating)
router.put('/updateWaterBill',  updateWaterBill)
router.get('/fetchPayment/',  getPayments)
router.get('/fetchPayment/',  getPayments)
router.delete('/removeTenant/',  deleteTenant)


module.exports= router ;
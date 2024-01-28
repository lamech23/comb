const express =require('express')
const router =express.Router()

const{ 
    tenatRegistration,
    tentantUpdating,
    paymentsCreations,
    updateWaterBill,
    getPayments
} =require('../../controllers/Renting/TenantRegistrationController')
//const {requireAuth} =require('../../middlleware/requireAuth')




router.post('/registerTenant',  tenatRegistration)
router.post('/registerPayment',  paymentsCreations)
//router.patch('/change/:id',requireAuth, tentantUpdating)
router.put('/updateWaterBill',  updateWaterBill)
router.get('/fetchPayment/',  getPayments)

module.exports=router
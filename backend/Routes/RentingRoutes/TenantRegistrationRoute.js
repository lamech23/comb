const express =require('express')
const router =express.Router()

const{ 
    tenatRegistration,
    tentantUpdating,
    updateWaterBill
} =require('../../controllers/Renting/TenantRegistrationController')
const {requireAuth} =require('../../middlleware/requireAuth')




router.post('/registerTenant',  tenatRegistration)
router.patch('/change/:id',requireAuth, tentantUpdating)
router.put('/updateWaterBill',  updateWaterBill)

module.exports=router
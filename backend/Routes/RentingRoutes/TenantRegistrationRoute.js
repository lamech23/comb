const express =require('express')
const router =express.Router()

const{ 
    tenatRegistration,
    tentantUpdating
} =require('../../controllers/Renting/TenantRegistrationController')
const {requireAuth} =require('../../middlleware/requireAuth')




router.post('/registerTenant', requireAuth, tenatRegistration)
router.patch('/change/:id', tentantUpdating)

module.exports=router
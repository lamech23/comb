const express =require('express')
const router =express.Router()

const{ 
    tenatRegistration,
    tentantUpdating
} =require('../../controllers/Renting/TenantRegistrationController')


router.post('/registerTenant', tenatRegistration)
router.patch('/change/:id', tentantUpdating)

module.exports=router
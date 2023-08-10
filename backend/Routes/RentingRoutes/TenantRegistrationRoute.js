const express =require('express')
const router =express.Router()

const{ 
    tenatRegistration
} =require('../../controllers/Renting/TenantRegistrationController')


router.post('/registerTenant', tenatRegistration)

module.exports=router
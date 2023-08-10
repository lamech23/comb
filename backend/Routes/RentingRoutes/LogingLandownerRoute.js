const express =require('express')
const router =express.Router()

const{ 
    loginginlandowner
} =require('../../controllers/Renting/HouseRegistrationController')


router.post('/log', loginginlandowner)

module.exports=router
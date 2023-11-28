const express =require('express')
const router =express.Router()

const{ 
    createWater
} =require('../../controllers/Renting/waterController')


router.post('/', createWater)

module.exports=router
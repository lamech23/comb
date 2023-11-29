const express =require('express')
const router =express.Router()

const{ 
    createWater
} =require('../../controllers/Renting/waterController')
const {requireAuth} =require('../../middlleware/requireAuth')



router.post('/', requireAuth, createWater)

module.exports=router
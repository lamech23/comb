const express =require('express')
const router =express.Router()

const{ 
    createWater,
    getWater
} =require('../../controllers/Renting/waterController')
const {requireAuth} =require('../../middlleware/requireAuth')



router.post('/', requireAuth, createWater)
router.get('/fetchWater/:id', getWater)

module.exports=router
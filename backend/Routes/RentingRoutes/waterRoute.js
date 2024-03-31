const express =require('express')
const router =express.Router()

const{ 
    createWater,
    getWater
} =require('../../controllers/Renting/waterController')
const {requireAuth} =require('../../middlleware/requireAuth')
const {hasAdmin, hasAgent} = require("../../middlleware/checkRoles");

router.post('/',hasAdmin ,hasAgent , requireAuth, createWater)
router.get('/fetchWater/:id',hasAdmin ,hasAgent , getWater)

module.exports=router
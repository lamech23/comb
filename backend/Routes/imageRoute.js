const express =require('express')
const router =express.Router()
const {
    createImages
}=require('../controllers/imageController')
const {requireAuth} =require('../middlleware/requireAuth')


router.post('/', requireAuth, createImages)




module.exports = router
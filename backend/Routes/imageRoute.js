const express =require('express')
const router =express.Router()
const {
    createImages
}=require('../controllers/imageController')
const {requireAuth } =require('../middlleware/requireAuth')
const {imageUpload } =require('../middlleware/upload')


router.post('/', requireAuth, imageUpload, createImages)




module.exports = router
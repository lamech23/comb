const express =require('express')
const router =express.Router()
const {
    createImages,
    getImages
}=require('../controllers/imageController');
//const {requireAuth } =require('../middlleware/requireAuth');
//const {imageUpload } =require('../middlleware/upload');

//router.post('/', requireAuth, imageUpload, createImages);
//router.get('/fetchImages',requireAuth, getImages);

module.exports = router
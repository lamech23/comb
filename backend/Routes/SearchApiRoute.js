const express =require('express')


const {
    getSearch
    
    
}=require('../controllers/SearchApiController')

const router =express.Router()

router.get('/search/:keyword',getSearch)

module.exports = router

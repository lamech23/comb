const express =require('express')
const router =express.Router()
const {
    createNewsLetter,
    getNewsLetter,
    deleteNewsletter
}=require('../controllers/NewsLetterController')

router.post('/', createNewsLetter)
router.get('/newsLetter',getNewsLetter)
router.delete('/deleteNewsLetter/:id',deleteNewsletter)



module.exports = router
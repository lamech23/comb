const express =require('express')
const router =express.Router()

const{ 
    RegisteringHouse,
    getTenants,
    getAllHouses,
    subtotal
} =require('../../controllers/Renting/HouseRegistrationController')


router.post('/', RegisteringHouse)
router.get('/specific/:houseName', getTenants)
router.get('/total/:id',  subtotal)
router.get('/', getAllHouses)

module.exports=router
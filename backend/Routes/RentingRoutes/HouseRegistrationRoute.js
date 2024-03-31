const express =require('express')
const router =express.Router()

const{ 
    RegisteringHouse,
    getTenants,
    getAllHouses,
    subtotal, 
    creatHouseCategory,
    getAllHousesByName,
    getTenantForTenantRegistration,
    getHouseByHouseName

} =require('../../controllers/Renting/HouseRegistrationController')

const { hasAdmin ,hasAgent } = require("../../middlleware/checkRoles");



router.post('/', hasAdmin ,hasAgent ,RegisteringHouse)
router.get('/specific/', hasAdmin ,hasAgent ,getTenants)
router.get('/houseNames/',hasAdmin ,hasAgent , getTenantForTenantRegistration)
router.get('/total/:id',hasAdmin ,hasAgent ,  subtotal)
router.get('/:houseId', hasAdmin ,hasAgent , getAllHouses)
router.get('/houseByHouseName' ,hasAdmin ,hasAgent ,  getHouseByHouseName)
router.get('/houseNames', hasAdmin ,hasAgent ,getAllHousesByName)
router.post('/houseName', hasAdmin ,hasAgent ,creatHouseCategory)

module.exports=router
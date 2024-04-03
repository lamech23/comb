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
const { verifyToken } = require('../../middlleware/token')
const { hasAdmin, hasAgent } = require('../../middlleware/checkRoles')



router.post('/',verifyToken, hasAdmin ,hasAgent ,RegisteringHouse)
router.get('/specific/', verifyToken,hasAdmin ,hasAgent ,getTenants)
router.get('/houseNames/',verifyToken,hasAdmin ,hasAgent , getTenantForTenantRegistration)
router.get('/total/:id',verifyToken,hasAdmin ,hasAgent ,  subtotal)
router.get('/:houseId', verifyToken, hasAdmin ,hasAgent , getAllHouses)
router.get('/houseByHouseName' ,verifyToken, hasAdmin ,hasAgent ,  getHouseByHouseName)
router.get('/houseNames', verifyToken, hasAdmin ,hasAgent ,getAllHousesByName)
router.post('/houseName',verifyToken,  hasAdmin ,hasAgent ,creatHouseCategory)

module.exports=router
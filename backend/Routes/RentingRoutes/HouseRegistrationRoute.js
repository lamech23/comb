const express =require('express')
const router =express.Router()

const{ 
    RegisteringHouse,
    getTenants,
    getAllHouses,
    subtotal, 
    creatHouseCategory,
    getAll,
    getTenantForTenantRegistration,
    getHouseByHouseName

} =require('../../controllers/Renting/HouseRegistrationController')

const {requireAuth, isAdmin, checkIfOwner} =require('../../middlleware/requireAuth')

router.post('/', RegisteringHouse)
router.get('/specific/', requireAuth,getTenants)
router.get('/houseNames/', getTenantForTenantRegistration)
router.get('/total/:id',  subtotal)
router.get('/:houseName', getAllHouses)
router.get('/houseByHouseName', getHouseByHouseName)
router.get('/allHouses', getAll)
router.post('/houseName', creatHouseCategory)

module.exports=router
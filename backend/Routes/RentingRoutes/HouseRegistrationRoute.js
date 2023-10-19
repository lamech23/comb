const express =require('express')
const router =express.Router()

const{ 
    RegisteringHouse,
    getTenants,
    getAllHouses,
    subtotal, 
    creatHouseCategory,
    getAll,
    getTenantForTenantRegistration

} =require('../../controllers/Renting/HouseRegistrationController')


router.post('/', RegisteringHouse)
router.get('/specific/', getTenants)
router.get('/houseNames/', getTenantForTenantRegistration)
router.get('/total/:id',  subtotal)
router.get('/', getAllHouses)
router.get('/allHouses', getAll)
router.post('/houseName', creatHouseCategory)

module.exports=router
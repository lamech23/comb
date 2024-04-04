const express =require('express')
const router =express.Router()
const {
    userLoginProccess,
    getRequest
}=require('../controllers/loginUserProcessController')



router.post('/',  userLoginProccess)
router.get('/fetchRequests',  getRequest)




module.exports = router
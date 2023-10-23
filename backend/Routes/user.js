const express =require('express')
const router =express.Router()
const {
    loginUser,
    signupUser,
    getAllUsers,
    reset,
    forgotPassword,
    deleteUser,
    updateUserEmail,
    getUserById,
    deactivate

}=require('../controllers/UserControllers')
// const isAdmin = require("../middlleware/requireAuth")
const {requireAuth, isAdmin, checkIfOwner} =require('../middlleware/requireAuth')


router.post('/login',loginUser)
router.get('/all', getAllUsers)
router.post('/signup', signupUser)
router.post('/forgotPassword', forgotPassword)
router.put('/reset/:id', reset)
router.put('/userUpdate/:id', updateUserEmail)
router.delete('/:id', deleteUser)
router.get('/specificUser/:id', getUserById, )
router.patch('/userStatus/:id', deactivate)

module.exports = router


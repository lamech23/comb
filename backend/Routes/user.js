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
    deactivate,
    logout,
    managment,
    getManagemts,
    verifyUser
}=require('../controllers/UserControllers')

const { verifyToken } = require("../middlleware/token");
const { hasAdmin ,hasAgent } = require("../middlleware/checkRoles");

router.post('/login',loginUser)
router.post('/logout',logout)
router.get('/all',verifyToken,hasAdmin,getAllUsers)
router.post('/signup', signupUser)
router.post('/forgotPassword', forgotPassword)
router.put('/reset/:id', reset)
router.patch('/userUpdate',verifyToken, updateUserEmail)
router.delete('/:id', deleteUser)
router.get('/specificUser/',verifyToken, getUserById,)
router.patch('/userStatus/:id', deactivate)
router.patch('/verifyUser/:id', verifyUser)
router.post('/assing', managment)
router.get('/fetchAgent', getManagemts)

module.exports = router


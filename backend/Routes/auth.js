const express =require('express')
const router =express.Router()
const {
    forgotPassword,
    resetPassword,
    updateUserEmail
}=require('../auth/resetPasswordAndEmail')
const {
    loginUser, logout
}=require('../auth/login')
const {
    register,
}=require('../auth/register')



router.post('/login',loginUser)
router.post('/register',register)
router.post('/logout',logout)
router.post('/forgotPassword', forgotPassword)
router.put('/reset/:id',  resetPassword)
router.put('/userEmailUpdate/:id', updateUserEmail)

module.exports = router


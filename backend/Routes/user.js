const express =require('express')
const router =express.Router()
const {
    getAllUsers,
    deleteUser,
    getUserById,
    deactivate,

}=require('../controllers/UserControllers')

router.get('/all', getAllUsers)
router.delete('/:id', deleteUser)
router.get('/specificUser/:id', getUserById, )
router.patch('/userStatus/:id', deactivate)

module.exports = router


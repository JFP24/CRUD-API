const {Router} = require("express")
const express = require("express")
const router = Router()
router.use(express.json()) 

const {
    createUsers,
    getUsers,
    updateUsers,
    deleteUser} = require("../Controllers/user.controller")

router.get("/allUsers", getUsers)
router.post("/createUsers", createUsers)
router.get("/updateUsers", updateUsers)
router.delete("/deleteUser", deleteUser)
module.exports = router
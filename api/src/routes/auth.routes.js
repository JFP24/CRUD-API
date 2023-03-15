//importamos la ruta de express
const {Router} = require("express")
const express = require("express")
const router = Router()
//usamos el json para leer lo que no entra por parametros
router.use(express.json())

const { login} = require("../Controllers/auth.controller")

router.post("/login", login)


module.exports = router
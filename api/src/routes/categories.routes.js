//importamos la ruta de express
const {Router} = require("express")
const express = require("express")
const router = Router()
//usamos el json para leer lo que no entra por parametros
router.use(express.json())

const { getCategories} = require("../Controllers/categories.controller")

router.get("/categories", getCategories)


module.exports = router
//importamos la ruta de express
const {Router} = require("express")
const express = require("express")
const router = Router()
//usamos el json para leer lo que no entra por parametros
router.use(express.json())

const { getProducts, createProducts, nameProduct} = require("../Controllers/products.controller")

router.get("/products", getProducts)
router.post("/createProducts", createProducts)
router.get("/nameProducts", nameProduct)

module.exports = router
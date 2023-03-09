const { Router } = require("express");
const router = Router();

//Importamos la rutas
const products = require("./products.routes.js")


// Configurar los routers

router.use("/api/v1", products)

module.exports = router;

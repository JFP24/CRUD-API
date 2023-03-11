const { Router } = require("express");
const router = Router();

//Importamos la rutas
const products = require("./products.routes.js")
const categories = require("./categories.routes")


// Configurar los routers

router.use("/api/v1", products)
router.use("/api/v1", categories)

module.exports = router;

const { Router } = require("express");
const router = Router();

//Importamos la rutas
const products = require("./products.routes.js")
const categories = require("./categories.routes.js")
const users = require("../routes/user.routes.js")


// Configurar los routers

router.use("/api/v1", products)
router.use("/api/v1", categories)
router.use("/api/v1", users)
module.exports = router;

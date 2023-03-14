const { Router } = require("express");
const router = Router();

//Importamos la rutas
const products = require("./products.routes.js")
const categories = require("./categories.routes.js")
const users = require("../routes/user.routes.js")
const auth = require("./auth.routes")


// Configurar los routers

router.use("/api/v1", products)
router.use("/api/v1", categories)
router.use("/api/v1", users)
router.use("/api/v1", auth)
module.exports = router;

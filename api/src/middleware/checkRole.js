const { Users } = require("../db");
const jwt = require("jsonwebtoken")


const checkRoleAuth = async (req, res, next)=> {
try {
//accedemos al token del usuario
const token = req.headers.authorization.split(" ").pop()
//verificamos que sea un token valido y obtenemos informacion necesaria de este
const tokenData = jwt.verify(token, "autho");
//verificamos con el id del token que se genera el user 
const userData = await Users.findByPk(tokenData.id)
//si el rol del user es admin pasamod la siguiente funcion
if(userData.role==="admin"){
    next()
}else {
//si no es admin no se le concede el permiso para accionar la funcion
 return res.statu(409).send({msg: "No tienes permisos para generar esta accion"})
}
} catch (error) {
console.log(error)
return res.status(409).send({msg: "Debes estar loguado para generar esta accion"})
}
}

const chekAuth = async(req, res, next)=>{
try {
//accedemos a el token que entre por header
const token = req.header.authorization.split(" ").pop()
 if(!token) return res.send("No estas logueado")
//verificamos que sea un token valido
const tokenData = jwt.verify(token, "autho")
if(tokenData.id){
    //si el token es valido significa que es logueado y pasamos la siguiente funcion
    next()
}else{
       //si no es valido mandamos mensaje de error
       return res
       .status(409)
       .send({ error: "Debes estar logueado para realizar esta accion" });
}

} catch (error) {
console.log(error)
return res
.status(409)
.send({ error: "Debes estar logueado para realizar esta accion" });
}

}


//exportamos los midleware
module.exports = {checkRoleAuth, chekAuth}
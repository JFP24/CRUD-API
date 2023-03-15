const { Users } = require("../db");
const check = require("../middleware/utils");

const login = async(req,res)=> {
try {
    //obtenemos informacion por body
const {email , password} = req.body
//buscamos si existe algun email en la DB
const user = await Users.findOne({where : {email}})
//si no existe mandanmos mensaje de error
if(!user) return res.status(404).send({msg:"Usuario no existe"})
//comparamos las constraseñas
const checkPassword = await check.compare(password , user.password)
//creamos token
const tokenSession = await check.tokenSign(user)

console.log(tokenSession)
if (checkPassword) {
    return res.status(202).json({ tokenSession, user });
  } else {
    return res.status(404).json({ msg: "constraseña invalida" });
  }
} catch (error) {
console.log(error)
return res.status(404).send({msg: "Error login"})

}
}

module.exports = {
login
}
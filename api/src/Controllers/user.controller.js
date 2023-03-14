const {Users}= require("../db")


const createUsers = async (req, res)=>{
try {
//obtenemos los datos del registro
const {username , email , image, password , role} = req.body
//validamos que entren los datos necesarios
if(!username || !email || !password) {
return res.status(404).send({msg: "Faltan datos por llenar"})
}
//buscamos que no exista un email igual
const emailFound = await Users.findOne({where : { email}})
//si no existe email creamos el usuario
if(!emailFound){        
const createUser = await Users.create({
username,
password ,
email ,
image,
role
})
return res.status(202).json({msg: "Usuario creado Correctamente" , createUser})
}else {
return res.status(404).send({msg: "Ya se encuentra registrado el email"})
}
} catch (error) {
console.log(error)
return res.status(404).send({msg:"Error CreateUsers"})
}
}



const getUsers = async (req, res) => {

try {
const allUsers = await Users.findAll()
console.log(allUsers)

    
} catch (error) {
    console.log(error)
    return res.status(404).send({msg: "error getUsers"})
}
}
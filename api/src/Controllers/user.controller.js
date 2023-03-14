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
//respondemos el usuario creado
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
//obtenemos todos los usuarios 
const allUsers = await Users.findAll()
//respondemos json de los usuarios para usarlos en el front
return res.status(202).json(allUsers)
console.log(allUsers)
} catch (error) {
 console.log(error)
return res.status(404).send({msg: "error getUsers"})
}
}

const updateUsers = async (req, res)=> {
try {
//traemos id por params
const {id} = req.params
//obtenemos por body los datos para actualizar
const { username, image } = req.body;
//validamos
if (username || image) {
//actualiza
 await Users.update(
{ username, image },
{ where: { id: id } }
);
return     res.status(202).json({ msg: "User actualizado" });
} else {
 return  res.status(404).send({ msg: "no se encuentran datos para actualizar" });
} 
} catch (error) {
console.log(error)
return res.status(404).send({msg: "Error updateUsers"})
}
}

const deleteUser =async (res, req)=> {
try {
//obtenemos id por params
const {id} = req.params
//eliminamos el usuario con la propiedad destroy
await Users.destroy({where :{id}})
return res.status(200).send({msg: "Usuario eliminado exitosamente"})
} catch (error) {
console.log(error)
return res.status(404).send({msg:"Error deleteUser"})
}
}


module.exports = {

    createUsers,
    getUsers,
    updateUsers,
    deleteUser

}
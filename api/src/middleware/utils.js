const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


//funcion para generar token cada vez que se loguea
const tokenSign =  (user)=>{

    //Generamos Token
    //sign para generar token
    return jwt.sign(
        {
            //obetenemos el id
            id:user.id,
            //usamos el role 
            role:user.role
        }, 
        "auhto" ,
        {
            expiresIn: 9999
        }
    )
    
}

//Creamos funcion para comparar contraseñas
//passwordPlain = contraseña que entra
//hashPassword = contraseña Guardada en la db
const compare = async (passwordPlain , hashPassword)=> {
    return await bcrypt.compare(passwordPlain, hashPassword)
}

module.exports = {
    tokenSign,
    compare
}
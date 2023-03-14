const { DataTypes } = require('sequelize')
const bcrypt = require("bcryptjs")
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('users', {

    //identificador unico para cada usuario
    id : {
        type: DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        allowNull : false ,
        primaryKey : true ,
        unique : true
    },
    username : {
        type: DataTypes.STRING,
        allowNul: false,
        //solo debe existir un nombre de usuario
        unique: true
    } ,
    email : {
        type: DataTypes.STRING,
        allowNul:false,
        unique: true
    },
    password : {
        type: DataTypes.TEXT,
        allowNul: true ,
        //agregamos la funcion para encriptar la password
        set(value){//value es el parametro que le pasamos a la funcion como la pass que encriptamos
            //encriptamos la password que entre
            const hash = bcrypt.hashSync(value, 10)
            this.setDataValue("password", hash)
        }
    },
    //agregamos roles , para indicar que tiene permitido hacer el usuario 
    role :{
        type: DataTypes.STRING,
        // por defecto sera de client
        defaultValue: "Client"
    }
  },
  { timestamps: true, createdAt: false, updatedAt: false }
  )
}
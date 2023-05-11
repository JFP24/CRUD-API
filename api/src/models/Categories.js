const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('categories', {
id: {
  type : DataTypes.UUID ,
  defaultValue: DataTypes.UUIDV4,
  allowNull: false ,
  primaryKey: true
},
name : {
  //reciba un string
  type : DataTypes.STRING ,
  // no puede estar vacio el contenido
  allowNull: false
}




  }),
  { timestamps: true, createdAt: false, updatedAt: false }
}
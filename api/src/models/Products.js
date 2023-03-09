const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // Defino modelo de productos
  sequelize.define("productos", {

id:{
  //Identificador unico
  type: DataTypes.UUID,
  defaultValue : DataTypes.UUIDV4,
  //no puede estar nullo
  allowNull : false,
  //llave foranea primaria
  primaryKey : true

},
//Nombre del producto
name : {
  //que se guarde como un string
type : DataTypes.STRING,
//No puede estar vacio el contenido
allowNull: false
},
//descripcion del producto
description : {
  //mandamos TEXT para que reciba textos largos
  type : DataTypes.TEXT,
  //No puede estar vacio el contenido
  allwNull : false
},
price : {
  //Que reciba numeros enteros
  type: DataTypes.INTEGER,
  //no puede estar vacio el contenido
  allowNull: false
},
enable : {
  //Mandamos un boleano para identificar si el producto esta disponible
  type : DataTypes.BOOLEAN,
  //valor por defecto true
  defaultValue: true,

},
image: {
  type : DataTypes.TEXT,
  allowNull: false
}
  }
  ,
  { timestamps: true, createdAt: false, updatedAt: false });
};

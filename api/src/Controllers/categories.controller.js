//importamos por medio del require los modelos de las base de datos para utilizarlos en la funciones
const {Productos , Categories}= require("../db")
const axios = require("axios")


const getCategories =async(req, res)=>{
try {
//Traemos la informacion por medio de una promesa 
const categories = await axios.get("https://api.escuelajs.co/api/v1/categories")
//creamos una variable con un arreglo vacio para luego agregar informacion
let data = []
//usamos un ciclo for para obtener solo la informacion necesaria de la data obtenida de la promesa
for (let i = 0; i < 5; i++) {
 const element = categories.data[i]
 //iteramos la informacion que necesitamos
let dataDos = {
id : element.id ,
name : element.name
}
//le agregamos la informacion a el arreglo creado anteriormente
data.push(dataDos)
}
//iteramos el arreglo para crear en la base de datos la informacion
data.map( (e)=> {
return Categories.findOrCreate({where : { name : e.name}})
})
//obtenemos la informacion de la base de datos , trae un arrelgo
let dataDB = await Categories.findAll()
//mapeamos la informacion del arreglo que necesitamos
let infoDB = dataDB.map((e)=> {
return {
id : e.id,
name: e.name
}
})
//respondemos el ultimo arreglo con la informacion 
return res.status(202).json(infoDB)
}catch(error){
console.log(error)
return res.status(404).send({msg : "Error getCategories"})
}
}

module.exports = {
    getCategories
}



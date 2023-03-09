//importamos por medio del require los modelos de las base de datos para utilizarlos en la funciones
const e = require("express")
const {Productos , Categories}= require("../db")

//Crear Productos
const createProducts = async (req, res)=> {
try {
//obtenemos informacion por el body
const {name , image, price, description, categories} = req.body
//validamos si nos entra informacion
console.log(req.body)
if(!name || !image || !price || !!description){
return res.status(404).send({msg : "Faltan espacios por llenar"})
}
 //creamos en la base de datos, con la informacion que recibimos
const createProducts = await Productos.create({
name , image, price, description
 })
//traemos la informacion para la coincidencia con las categories
//const categoriesDB = await Categories.findAll({where : {name:categories}})
//hacemos la relacion 
 //await createProducts.addCategories(categoriesDB)
return res.status(201).send({msg:"Se ha creado el producto con exito", createProducts})  
} catch (error) {
console.log(error)
return  res.status(404).send("error createProducts")
}  
}
    

//Funcion asincrona para extraer todos los productos de la base de datos
const getProducts = async(req, res)=>{
//utilizamos tryCatch para un mejor manejo de errores
try{
const allProducts = await Productos.findAll({
    include : Categories
})
//console.log(allProducts)
//mapeamos el arreglo
const data = allProducts.map((d)=> {
return {
id : d.id,
name: d.name,
description : d.description,
image : d.image,
price : d.price,
enable : d.enable,
categories : d.categories.map((e)=>{ return { id :e.id , name: e.name}})
}
})
return res.status(202).json(data)
}catch(error) {
console.log(error)
return res.status(404).send("error getProducts")
}
}




//exportamos el modulo con las funciones
module.exports = {
    getProducts,
    createProducts
}
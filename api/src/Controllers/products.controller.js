//importamos por medio del require los modelos de las base de datos para utilizarlos en la funciones
const {Productos , Categories}= require("../db")
const axios = require("axios")
const { response } = require("../app")


//Crear Productos
const createProducts = async (req, res)=> {
    try {
//obtenemos informacion por el body
const {name , image, price, description, categories} = req.body
//validamos si nos entra informacion
console.log(req.body)
if(!name || !image || !price || !description || !categories){
return res.status(404).send({msg : "Faltan espacios por llenar"})
}
 //creamos en la base de datos, con la informacion que recibimos
const createProducts = await Productos.create({
name , image, price, description
 })
//traemos la informacion para la coincidencia con las categories
const categoriesDB = await Categories.findAll({where : {name:categories}})
//hacemos la relacion 
 await createProducts.addCategories(categoriesDB)
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
//hacemos la peticion por medio de una promesa a la api para traer la informacion
const dataApi = await axios.get("https://api.escuelajs.co/api/v1/products?offset=0&limit=30")
//iteramos el arreglo que entra y retornamos un arreglo nuevo con la informacion organizada
const infoApi = dataApi.data.map((e)=>{
return {
id : e.id,
name: e.title,
description : e.description,
image : e.images[0],
price : e.price,
categories : e.category.name
}
})
//console.log(infoApi)
const allProducts = await Productos.findAll({
include : Categories,
atribute: {
name: "name",
}
})

//mapeamos el arreglo
const data = allProducts.map((d)=> {
return {
id : d.id,
name: d.name,
description : d.description,
image : d.image,
price : d.price,
enable : d.enable,
categories : d.categories[0].name
}
})
//console.log(data)
//concatenamos el arreglo de la DB y el arreglo de la info de la API
const allData = data.concat(infoApi)
return res.status(202).json(allData)
}catch(error) {
console.log(error)
return res.status(404).send("error getProducts")
}
}


const nameProduct = async (req, res)=>{
try {
    //obetenemos la informacion por query
const {name} = req.query
//buscamos la coincidencia en la db
const infoDb = await Productos.findOne({where : {name},  include: Categories})
//hacemos la peticion en la db 
//console.log(infoDb)
const dataApi = await axios.get(`https://api.escuelajs.co/api/v1/products/?title=${name}`)
//console.log(dataApi)
if(infoDb){
const dataDb = [
    {
 id : infoDb.id,
name: infoDb.name,
description : infoDb.description,
image : infoDb.image,
price : infoDb.price,
enable : infoDb.enable,
categories : infoDb.categories[0].name
}
]
const infoApi = dataApi.data.map((e)=> {
    return {
        id : e.id,
        name: e.title,
        description : e.description,
        image : e.images[0],
        price : e.price,
        categories : e.category.name
        }
})
const allData = dataDb.concat(infoApi)
return res.status(202).json(allData)

}else {
    const infoApi = dataApi.data.map((e)=> {
        return {
            id : e.id,
            name: e.title,
            description : e.description,
            image : e.images[0],
            price : e.price,
            categories : e.category.name
            }
    })

    return res.status(202).json(infoApi)
}

} catch (error) {
console.log(error)
return res.status(404).send({msg : "Error from nameProduct"})
}
}



const updateProduct = async(req, res)=> {
    try {
        //obtenemos id por params
const {id} = req.params
//obtenemos la informacion que deseamos cambiar 
const {name , image, price, description}= req.body
//validamos que cualquiera de la inforamcion ente
if(name || image || price || description){
    await Productos.update(
        //actualizamos 
        {name, image,price, description},
        //donde el id del producto coincida
        {where : {id:id}}
    )

    //respondemos
    return res.status(202).json({msg: "Producto actualizado"})
}else{
    return res
        .status(309)
        .json({ msg: "no se encuentran datos para actualizar" });
}

    }catch(error){
console.log(error)
return res.status(404).send({msg: "Erro updateProduct"})
    }
}

const detailsProduct = async (req, res)=>{
try {
const {id}= req.params
//si el tipo de id es un string, busca en la base de datos
if(id.includes("-")){
    //buscamos en id
    console.log(id)
const infoDb = await Productos.findOne({where : {id} , include : Categories})
const dataDb = [
    {
id : infoDb.id,
name: infoDb.name,
description : infoDb.description,
image : infoDb.image,
price : infoDb.price,
enable : infoDb.enable,
 categories : infoDb.categories[0].name

}
]
console.log(dataDb)
return res.status(202).json(dataDb)
}else {
const dataApi = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`)
const infoApi = [
{
id : dataApi.data.id,
name: dataApi.data.title,
description : dataApi.data.description,
image : dataApi.data.images[0],
price : dataApi.data.price,
categories : dataApi.data.category.name
}
]
 
return res.status(202).json(infoApi)
}
 
} catch (error) {
    console.log(error)
    return res.status(404).send({msg: "Error DetailsProduct"})
}
}


//exportamos el modulo con las funciones
module.exports = {
    getProducts,
    createProducts,
    nameProduct,
    updateProduct,
    detailsProduct
}
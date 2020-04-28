/** author : Carlos San Juan Martin */

//definimos un schema de mongoose lo suyo
const mongoose = require ('mongoose');

const BookSchema= new mongoose.Schema({
    title: String
}); //cuando tu te vaya a mongo y te cojas un objeto de la coleccion book va a tener un campo llamado title y q contenga un string
const Book = mongoose.model('Book', BookSchema);//creame una nueva clase o modelo
module.exports = Book;
//const book = new Book({title:' el señor de los anillos'});//creamos un obejeto de la clase book y le ponemos un titulo
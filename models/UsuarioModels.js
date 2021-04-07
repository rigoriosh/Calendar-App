/*  ya estando conectado con la DB se realiza un modelo que viene siendo la estructuración de una tabla
    para cada tabla se debe crear un modelo.
    Estos modelo se utilizan en los controladores
 */
const { Schema, model } = require("mongoose");


const UsuarioSchema = Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
});
/* 
    Modelo y creacion de la tabla en db, en este caso la tabla (o de ahora en adelante collection), se llama 'usuarioschema'
 */
module.exports=model('usuarioschema', UsuarioSchema); 
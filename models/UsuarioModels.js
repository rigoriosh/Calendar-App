/*  ya estando conectado con la DB se realiza un modelo que viene siendo la estructuración de una tabla.
    para cada tabla se debe crear un modelo.
    Estos modelo se utilizan en los controladores
 */
const { Schema, model } = require("mongoose");


const UsuarioSchema = Schema({
    name:{ //columna de la coleccion y sus caracteristicas
        type: String,
        required: true
    },
    email:{ //columna de la coleccion y sus caracteristicas
        type: String,
        required: true,
        unique: true
    },
    password: { //columna de la coleccion y sus caracteristicas
        type: String,
        required: true
    }
});
/* forma de modificar el nombre de los campos que retorna la db */
UsuarioSchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject();
    object.idRegisro = _id;
    return object;
})
/* 
    Modelo y creacion de la tabla en db, en este caso la tabla (o de ahora en adelante collection), se llama 'usuarioschema'
 */
module.exports=model('usuarioschema', UsuarioSchema); 
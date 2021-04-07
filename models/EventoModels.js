/*  ya estando conectado con la DB se realiza un modelo que viene siendo la estructuración de una tabla.
    para cada tabla se debe crear un modelo.
    Estos modelo se utilizan en los controladores
 */
    const { Schema, model } = require("mongoose");


    const EventsSchema = Schema({
        title:{ //columna de la coleccion y sus caracteristicas
            type: String,
            required: true
        },
        notes:{
            type: String
        },
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId, //es una referencia otra coleccion, como una llave foranea
            ref: 'usuarioschema', // coleccion a la que se hace referencia            
            required: true
        }
    });
    /* forma de modificar el nombre de los campos que retorna la db */
    EventsSchema.method('toJSON', function () {
        const {__v, _id, ...object} = this.toObject();
        object.registerID = _id;
        return object;
    })
    /* 
        Modelo y creacion de la tabla en db, en este caso la tabla (o de ahora en adelante collection), se llama 'events_collection'
     */
    module.exports=model('events_collection', EventsSchema); 
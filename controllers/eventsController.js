const { response, request } = require("express");
const { errorAdmin, idEvenNotFindError, notUserIdValidError, notUserIdValidToDeleteError} = require("../helpers/msgErrors");
const EventoModels = require("../models/EventoModels");
const UsuarioModels = require("../models/UsuarioModels");


const getEventsController = async(req = request, res = response) => {

    const {uid, name} = req.payloadJWT;
    //const newToken = await generarJWT(uid, name);

    const eventos = await EventoModels.find(/* {user:uid} */).populate('user', 'name email'); // con esta linea se pide que del registro usuario traiga a demas del id del usuario, traiga tambien los campos 'name' y 'email'
    //console.log(eventos)
    res.status(200).json({
        ok: true,
        msg: 'getEventsController',
        eventos
    })
}

const newEventsController = async(req = request, res = response) => {

    const {uid, name} = req.payloadJWT;

   const evento = new EventoModels(req.body);
    
    //console.log({uid})
   try {
       evento.user = uid; // se setea el uid al schema especificamente al campo q esta por referencia
       //console.log({evento})
       const eventoGuardado = await evento.save();
       res.status(200).json({ok: true, eventoGuardado})
   } catch (error) {
       errorAdmin(error, res);
   }
}

const updateEventsController = async(req = request, res = response) => {

    const eventoID = req.params.id;
    const {uid, name} = req.payloadJWT;

    try {

        const evento = await EventoModels.findById(eventoID);
        if(!evento) return idEvenNotFindError(res, eventoID)
        
        if(evento.user.toString() !== uid) return notUserIdValidError(res);

        const eventoActualizado = {
            ...req.body,
            user: uid
        }

        
        const eventoModificado = await EventoModels.findByIdAndUpdate(eventoID, eventoActualizado);
        
        res.status(200).json({
            ok: true,
            msg: 'updateEventsController',
            eventoModificado,
            eventoActualizado
        })
    } catch (error) {
        errorAdmin(error, res);
    }
    
}

const deleteEventsController = async(req = request, res = response) => {

    const {id} = req.params;
    const {uid, name} = req.payloadJWT;

    try {

        const evento = await EventoModels.findById(id);
        if(!evento) return idEvenNotFindError(res, id)

        if(evento.user.toString() !== uid) return notUserIdValidToDeleteError(res);

        const eventoEliminado = await EventoModels.findByIdAndDelete(id);
        
        res.status(200).json({
            ok: true,
            msg: 'updateEventsController',
            eventoEliminado
        })
    } catch (error) {
        errorAdmin(error, res);
    }
}

module.exports = {
    newEventsController,
    getEventsController,
    updateEventsController,
    deleteEventsController
}
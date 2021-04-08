const {response} = require('express');
const bcryptjs = require('bcryptjs');
const UsuarioModels = require('../models/UsuarioModels');
const { errorAdmin, errorNotEmail, errorExisteEmail, wrongPassword } = require('../helpers/msgErrors');
const { generarJWT } = require('../helpers/jwt');

const loginUsuario = async(req, res = response) => {
    console.log('loginUsuario')
    const {email, password} = req.body
    try {
        /* verificar si el email no existe en la db */
        let usuarioModel = await UsuarioModels.findOne({email: email})
        if (!usuarioModel) {
            return errorNotEmail(email, res);
        }

        /* confirmar los passwords */
        const validaPassword = bcryptjs.compareSync(password, usuarioModel.password);
        if (!validaPassword) {
            return wrongPassword(res);
        }

        // generar jwt
        const token = await generarJWT(usuarioModel.id, usuarioModel.name);

        res.status(200).json({
            ok: true,
            uid: usuarioModel.id,
            name: usuarioModel.name,
            token
        })
    } catch (error) {
        errorAdmin(error, res);
    }
}

const crearUsuario = async(req, res = response) => {    
    console.log('crearUsuario')
    const {name, email, password} = req.body
    
    try {
        /* verificar si el email no existe en la db */
        let usuarioModel = await UsuarioModels.findOne({email})
        if (usuarioModel) {
            return errorExisteEmail(email, res)
        }
        
        usuarioModel = new UsuarioModels(req.body);// instancia la coleccion de mongo
        //encripta la contraseña
        const salt = bcryptjs.genSaltSync();
        usuarioModel.password = bcryptjs.hashSync(password, salt);

        await usuarioModel.save(); //guarda en la DB

        // generar jwt
        const token = await generarJWT(usuarioModel.id, usuarioModel.name);
    
        res.status(201).json({
            ok: true,
            uid: usuarioModel.id,
            user: {name, email},
            token
        })
    } catch (error) {
        errorAdmin(error, res);
    }
}

const revalidarToken = async(req, res = response) => {
    console.log('revalidarToken')
    const {uid, name} = req.payloadJWT;   
    /* generar nuevo token */
    const token = await generarJWT(uid, name);
    res.json({
        ok: true,
        token,
        uid, name
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}
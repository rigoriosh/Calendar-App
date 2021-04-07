const {response} = require('express');
const bcryptjs = require('bcryptjs');
const UsuarioModels = require('../models/UsuarioModels');
const { errorAdmin, errorNotEmail, errorExisteEmail, wrongPassword } = require('../helpers/msgErrors');
const { generarJWT } = require('../helpers/jwt');

const loginUsuario = async(req, res = response) => {
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
            msg: 'loginUsuario',
            uid: usuarioModel.id,
            name: usuarioModel.name,
            token
        })
    } catch (error) {
        errorAdmin(error, res);
    }
}

const crearUsuario = async(req, res = response) => {    
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
            msg: 'Usuario creado',
            uid: usuarioModel.id,
            user: {name, email, password},
            token
        })
    } catch (error) {
        errorAdmin(error, res);
    }
}

const revalidarToken = async(req, res = response) => {
    const {uid, name} = req.payloadJWT;   
    /* generar nuevo token */
    const newToken = await generarJWT(uid, name);
    res.json({
        msg: 'revalidarToken',
        newToken
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}
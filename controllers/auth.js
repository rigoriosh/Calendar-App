const {response} = require('express');
const bcryptjs = require('bcryptjs');
const UsuarioModels = require('../models/UsuarioModels');
const { errorAdmin } = require('../utils/utilsLogic');

const loginUsuario = (req, res = response) => {
    const {email, password} = req.body
    try {
        /* verificar si el email no existe en la db */
        let usuarioModel = await UsuarioModels.findOne({email: email})
        if (!usuarioModel) {
            return res.status(400).json({
                ok: false,
                msg: `El ${email} no existe en la db`
            })
        }
        res.status(200).json({
            msg: 'loginUsuario',
            user: {email, password}
        })
    } catch (error) {
        errorAdmin();
    }
}

const crearUsuario = async(req, res = response) => {    
    const {name, email, password} = req.body
    
    try {
        /* verificar si el email no existe en la db */
        let usuarioModel = await UsuarioModels.findOne({email: email})
        if (usuarioModel) {
            return res.status(400).json({
                ok: false,
                msg: `El ${email} ya existe en la db`
            })
        }
        
        usuarioModel = new UsuarioModels(req.body);// instacia la coleccion de mongo
        //encripta la contraseña
        const salt = bcryptjs.genSaltSync();
        usuarioModel.password = bcryptjs.hashSync(password, salt);

        await usuarioModel.save(); //guarda en la DB
    
        res.status(201).json({
            msg: 'Usuario creado',
            uid: usuarioModel.id,
            user: {name, email, password}
        })
    } catch (error) {
        errorAdmin();
    }
}

const revalidarToken = (req, res = response) => {
    res.json({
        msg: 'loginUsuario'
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}
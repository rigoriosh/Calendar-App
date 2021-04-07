const {response} = require('express');
const UsuarioModels = require('../models/UsuarioModels');

const loginUsuario = (req, res = response) => {
    const {email, password} = req.body
    
    res.status(200).json({
        msg: 'loginUsuario',
        user: {email, password}
    })
}

const crearUsuario = async(req, res = response) => {    
    const {name, email, password} = req.body
    
    try {
        const usuarioModel = new UsuarioModels(req.body);
        await usuarioModel.save(); //guarda en la DB
    
        res.status(201).json({
            msg: 'crearUsuario',
            user: {name, email, password}
        })
    } catch (error) {
        console.log({error})
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
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
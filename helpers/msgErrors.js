
const errorAdmin = (error, res) => {
    console.log({error})
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
}

const errorExisteEmail = (email, res) => {    
        res.status(400).json({
            ok: false,
            msg: `El email: ${email} ya existe en la db`
        })
}

const errorNotEmail = (email, res) => {    
        res.status(400).json({
            ok: false,
            msg: `El email: ${email} no existe en la db`
        })
}

const wrongPassword = (res) => {    
        res.status(400).json({
            ok: false,
            msg: `Password incorrecto`
        })
}

const sinTokenError = (res) => {    
    res.status(400).json({
        ok: false,
        msg: `Sin token en la petición`
    })
}

const tokenNoValidoError = (res) => {
    res.status(400).json({
        ok: false,
        msg: `Token no valido`
    })
}

const idEvenNotFindError = (res, id) => {
    res.status(404).json({
        ok: false,
        msg: `Evento no existe por el Id: ${id} ingresado`
    })
}

const notUserIdValidError = (res) => {
    res.status(401).json({
        ok: false,
        msg: `El usuario actual no tiene privilegios de editar este evento`
    })
}

const notUserIdValidToDeleteError = (res) => {
    res.status(401).json({
        ok: false,
        msg: `El usuario actual no tiene privilegios de eliminar este evento`
    })
}

module.exports = {
    errorAdmin,
    errorNotEmail,
    errorExisteEmail,
    wrongPassword,
    sinTokenError,
    tokenNoValidoError,
    idEvenNotFindError,
    notUserIdValidError,
    notUserIdValidToDeleteError
}
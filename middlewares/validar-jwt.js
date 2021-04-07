const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const {sinTokenError, tokenNoValidoError} = require('../helpers/msgErrors');


const validarJWT = (req = request, res = response, next) => {

    // x-token headers
    const token = req.header('x-token');
    if (!token) {
        return sinTokenError(res);
    }

    /* validación del token */
    try {
        const palabraSecreta = process.env.SECRET_JWT_SIGN
        const payload = jwt.verify(
            token,
            palabraSecreta
        )
        //console.log(payload);
        /* guardar el pyaload en el req para utilizado en otras partes donde se requiera */
        req.payloadJWT = payload
    } catch (error) {
        return tokenNoValidoError(res)
    }

    next()
}

module.exports = {
    validarJWT
}
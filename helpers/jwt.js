const jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => {

    return new Promise((resolve, reject) => {

        const payload = {uid, name};

        const palabraSecreta = process.env.SECRET_JWT_SIGN
        jwt.sign(payload, palabraSecreta, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log({err});
                reject('No se logró generar el token')
            }else{
                resolve(token);
            }

        })
    })

}

module.exports = {
    generarJWT
}
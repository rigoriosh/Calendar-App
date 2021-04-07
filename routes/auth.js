const { Router} = require("express");
const {crearUsuario, revalidarToken, loginUsuario} = require("../controllers/auth");
const { middlewaresLogin, middlewaresCrearUsuario } = require("../middlewares/middleWareAuth");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post('/', middlewaresLogin, loginUsuario);

router.post('/new', middlewaresCrearUsuario, crearUsuario);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;
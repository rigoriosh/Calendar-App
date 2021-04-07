const { Router, response } = require("express");
const { check, validationResult } = require("express-validator");
const {crearUsuario, revalidarToken, loginUsuario} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

const middlewaresLogin = [    
    check('email', `El 'email' es obligatorio`).isEmail(),
    check('password', `El campo 'password' es obligatorio y > a 6 caracteres`).isLength({min:6}),
    (req, res = response, next) => {

        // manejo de errores
        const errors = validationResult(req);    
        if (!errors.isEmpty()){
            return res.status(400).json({
                ok: false,
                errors: errors.mapped()
            })
        }
    
        next();
    }
];
router.post('/', middlewaresLogin, loginUsuario);

const middlewaresCrearUsuario = [
    check('name', `El campo 'name' es obligatorio`).not().isEmpty(),
    check('email', `El 'email' es obligatorio`).isEmail(),
    check('password', `El campo 'password' es obligatorio y > a 6 caracteres`).isLength({min:6}),
    (req, res = response, next) => {

        // manejo de errores
        const errors = validationResult(req);    
        if (!errors.isEmpty()){
            return res.status(400).json({
                ok: false,
                errors: errors.mapped()
            })
        }
    
        next();
    }
];
router.post('/new', middlewaresCrearUsuario, crearUsuario);

router.get('/renew', revalidarToken);

module.exports = router;
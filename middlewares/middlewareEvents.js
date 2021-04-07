const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("./validar-campos");




const mid_newEvent = [
    check('title', 'El campo title es requerido').not().isEmpty(),
    //check('notes', 'El campo notes es requerido').not().isEmpty(),
    check('start', 'la fecha de inicio es obligatortia y debe ser valida').custom(isDate),
    check('end', 'la fecha fin es obligatortia y debe ser valida').custom(isDate),
    validarCampos
]


module.exports = {
    mid_newEvent
}
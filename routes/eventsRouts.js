const { Router } = require("express");
const { getEventsController, newEventsController, updateEventsController, deleteEventsController } = require("../controllers/eventsController");
const { mid_newEvent } = require("../middlewares/middlewareEvents");
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router();
/* 
    como las siguientes rutas deben llevar el middle 'validarJWT', entonces se setea al inicio
    y asi queda aplicado a todas las rutas configuras a continuación
 */
router.use(validarJWT); //todas las rutas deben pasar primero por 'validarJWT'

router.get('/', getEventsController);

router.post('/', mid_newEvent, newEventsController);

router.put('/:id', mid_newEvent, updateEventsController);

router.delete('/:id', deleteEventsController);


module.exports = router
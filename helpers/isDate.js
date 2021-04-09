const moment = require('moment');

const isDate = (value, {req, location, path}) => {

   /*  console.log({value})
    console.log({location, path})
    console.log(req.body) */

    const fecha = moment(value)
    if(!value || !fecha.isValid()) return false;
    
    return true

}


module.exports = {
    isDate
}
/* dbUser: mern_user
db_pass: 75rbFM1PrAlj1LR1 */

const mongoose = require('mongoose');

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

/* realiza la conection to Db */
const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB Connected')
    } catch (error) {
        console.log(error)
        throw new Error('Error on connection to database')
    }
}

module.exports = {dbConnection}
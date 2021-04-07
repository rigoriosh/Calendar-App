
const errorAdmin = () => {
    console.log({error})
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
}

const errorNotemail = (email) => {
    console.log({error})
        res.status(400).json({
            ok: false,
            msg: `El ${email}, no existe`
        })
}


module.exports = {
    errorAdmin,
    errorNotemail
}
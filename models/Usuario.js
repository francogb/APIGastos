const mongoose = require('mongoose')
const { model, Schema } = mongoose

const usuarioSchema = new Schema({
  username: String,
  nombre: String,
  passwordHash: String,
  gastos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Gasto'
    }
  ]
})
usuarioSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  }
})

const Usuario = model('Usuario', usuarioSchema)

module.exports = Usuario

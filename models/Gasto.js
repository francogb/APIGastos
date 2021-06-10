const mongoose = require('mongoose')
const { model, Schema } = mongoose

const gastoSchema = new Schema({
  nombre: String,
  fecha: Date,
  valor: Number,
  categoria: String,
  descripcion: String,
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
})
gastoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Gasto = model('Gasto', gastoSchema)

module.exports = Gasto

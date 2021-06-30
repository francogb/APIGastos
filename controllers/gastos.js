const gastosRouter = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const Gasto = require('../models/Gasto')
const Usuario = require('../models/Usuario')

gastosRouter.get('/', async (request, response) => {
  Gasto.find({}).then(gastos => {
    response.json(gastos)
  })
})

gastosRouter.get('/:id', (request, response, next) => {
  const { id } = request.params

  Gasto.findById(id).then(gasto => {
    if (gasto) {
      return response.json(gasto)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error)
  )
})

gastosRouter.delete('/:id', (request, response, next) => {
  const { id } = request.params
  Gasto.findByIdAndRemove(id).then(() => {
    response.status(204).end()
  }).catch(error => next(error))
  response.status(204).end()
})

gastosRouter.put('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const gasto = request.body

  const newGastoInfo = {
    nombre: gasto.nombre,
    categoria: gasto.categoria,
    descripcion: gasto.descripcion,
    valor: gasto.valor
  }

  Gasto.findByIdAndUpdate(id, newGastoInfo, { new: true })
    .then(result => {
      response.json(result)
    })
    .catch(next)
})

gastosRouter.post('/', userExtractor, async (request, response, next) => {
  const {
    nombre,
    categoria,
    valor,
    descripcion
  } = request.body

  const { usuario } = request

  const user = await Usuario.findById(usuario)

  if (!nombre) {
    return response.status(400).json({
      error: 'Required "nombre" field is missing'
    })
  }

  const newGasto = new Gasto({
    nombre,
    categoria,
    valor,
    fecha: new Date(),
    descripcion,
    usuario: user._id
  })
  try {
    const savedGasto = await newGasto.save()
    user.gastos = user.gastos.concat(savedGasto._id)
    await user.save()

    response.json(savedGasto)
  } catch (error) {
    next(error)
  }
})

module.exports = gastosRouter

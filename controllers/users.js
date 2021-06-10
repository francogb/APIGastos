const usersRouter = require('express').Router()
const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, nombre, password } = body
  const passwordHash = await bcrypt.hash(password, 10)
  const usuario = new Usuario({
    username,
    nombre,
    passwordHash
  })

  const savedUser = await usuario.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const usuarios = await Usuario.find({}).populate('gastos',
    {
      nombre: 1,
      categoria: 1,
      valor: 1,
      fecha: 1,
      descripcion: 1
    }
  )
  response.json(usuarios)
})

usersRouter.get('/:id', (request, response, next) => {
  const { id } = request.params

  Usuario.findById(id).populate('gastos',
    {
      nombre: 1,
      categoria: 1,
      valor: 1,
      fecha: 1,
      descripcion: 1
    }
  ).then(usuario => {
    if (usuario) {
      return response.json(usuario)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error)
  )
})

module.exports = usersRouter

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Usuario = require('../models/Usuario')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  const usuario = await Usuario.findOne({ username })
  const passwordCorrect = usuario === null
    ? false
    : await bcrypt.compare(password, usuario.passwordHash)

  if (!(usuario && passwordCorrect)) {
    response.status(401).json({
      error: 'Invalid user or password'
    })
  } else {
    const userForToken = {
      id: usuario._id,
      username: usuario.username
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    response.send({
      nombre: usuario.nombre,
      username: usuario.username,
      token
    })
  }
})

module.exports = loginRouter

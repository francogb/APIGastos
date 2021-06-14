require('dotenv').config()
require('./mongo')

const express = require('express')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const app = express()
const usersRouter = require('./controllers/users')
const gastosRouter = require('./controllers/gastos')
const loginRouter = require('./controllers/login')

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hola Mundo</h1>')
})

app.use('/api/login', loginRouter)
app.use('/api/gastos', gastosRouter)
app.use('/api/usuarios', usersRouter)

app.use(notFound)

app.use(handleErrors)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

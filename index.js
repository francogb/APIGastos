require('./mongo')

const express = require('express')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const app = express()
const usersRouter = require('./controllers/users')
const gastosRouter = require('./controllers/gastos')

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hola Mundo</h1>')
})

app.use('/api/gastos', gastosRouter)
app.use('/api/usuarios', usersRouter)

app.use(notFound)

app.use(handleErrors)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

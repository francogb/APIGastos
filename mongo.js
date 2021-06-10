const mongoose = require('mongoose')
const password = require('./password.js')

const connectionString = `mongodb+srv://Francogb:${password}@cluster0.rn8yz.mongodb.net/gastosDB?retryWrites=true&w=majority`

mongoose.connect(connectionString)
  .then(() => {
    console.log('Datebase connected')
  }).catch(err => {
    console.error(err)
  })

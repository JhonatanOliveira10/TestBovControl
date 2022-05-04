const express = require("express")
const cors = require("cors")
const { connection } = require("./database")
const application = express()

global.db = connection()

application.use(cors())
application.use(express.urlencoded({ extended: true }))
application.use(express.json())
application.use(require('./routes'))

application.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
0
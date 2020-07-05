// express application will get set up and load it in 
// and exported and test can be load it in
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/users.js')
const taskRouter = require('./routers/tasks.js')

const app = express()

app.use(express.json())
// User
app.use(userRouter)
// Task
app.use(taskRouter)

module.exports = app
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/users.js')
const taskRouter = require('./routers/tasks.js')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
// User
app.use(userRouter)
// Task
app.use(taskRouter)

// start the port
app.listen(port, ()=>{
    console.log('Server ready on ' + port )
})
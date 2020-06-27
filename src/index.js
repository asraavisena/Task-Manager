// learn with Postman too
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/users.js')
const taskRouter = require('./routers/tasks.js')

const app = express()
const port = process.env.PORT || 3000

// with Middleware
// app.use((req, res, next ) => {
//     console.log(req.method, req.path)
//     if (req.method === 'GET' ) {
//         res.send('GET requests are disable ')
//     } else {
//         next()
//     } 
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down')
// })

app.use(express.json())
// User
app.use(userRouter)
// Task
app.use(taskRouter)

// start the port
app.listen(port, ()=>{
    console.log('Server ready on ' + port )
})
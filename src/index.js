const app = require('./app')
const port = process.env.PORT

// start the port
app.listen(port, ()=>{
    console.log('Server ready on ' + port )
})
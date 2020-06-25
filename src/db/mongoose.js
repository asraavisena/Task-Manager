const mongoose = require('mongoose')
const validator = require('validator')

// connect to database with the name of new database
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    // When Mongoose works with MongoDB our indexes are created allowing us to quickly access the data we need to access
    useCreateIndex: true,
    // To hide useFindAndModify warning on console
    useFindAndModify: false
})

// const task_1 = new Task({
//     description: 'Learn PHP',
    
// })

// task_1.save().then(()=>{
//     console.log(task_1)
// }).catch((error)=>{
//     console.log('Error: ', error)
// })

// const me = new User({
//     name: 'Avisena      ',
//     email: 'avisena@asra.com    ',
//     password:'asdfgg123!',
//     age: 21
// })

// //Promises from .then()
// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error: ', error)
// })
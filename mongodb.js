// CRUD
// const mongodb = require('mongodb')
// // Give an access to the function necessary to connect to the db so can perform CRUD
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

// shorthand from up above
const {MongoClient, ObjectID}= require('mongodb')

// dont use localhost:27017 somehow there is an issue
const connectionURL = 'mongodb://127.0.0.1:27017'
// create new database
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, {useNewUrlParser:true}, (error, client)=>{
    if(error){
        return console.log('Unable connect to database!')
    }
    console.log('You are connected')
    const db = client.db(databaseName)
})
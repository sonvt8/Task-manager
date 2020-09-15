const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if (error) {
        console.log('Unable to connect to database!')
    }

    //CREATE DATABASE
    const db = client.db(databaseName)

    db.collection('user').insertOne({
        _id: id,
        name: 'Robert Binh',
        age: 25
    },(error, result) => {
        if (error) {
            return console.log('Unable to insert User')
        }
        console.log(result.ops)
    })

    // db.collection('user').insertMany([
    //     {
    //         name: 'Nhung Bach',
    //         age: 28
    //     },
    //     {
    //         name: 'Son Vu',
    //         age: 32
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Dev',
    //         completed: false
    //     },
    //     {
    //         description: 'Learn something new',
    //         completed: true
    //     },
    //     {
    //         description: 'Doing excercise',
    //         completed: false
    //     }
    // ],(error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert new data')
    //     }

    //     console.log(result.ops)
    // })
})
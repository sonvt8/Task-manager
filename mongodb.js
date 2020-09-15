const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if (error) {
        console.log('Unable to connect to database!')
    }

    //CREATE DATABASE
    const db = client.db(databaseName)

    db.collection('user').insertOne({
        name: 'Tommy',
        age: 27
    })

})
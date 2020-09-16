const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if (error) {
        console.log('Unable to connect to database!')
    }

    //CREATE DATABASE
    const db = client.db(databaseName)

    db.collection('users').findOne({_id : new ObjectID("5f606fa462528024fe2422c5")}, (error, user) => {
        if (error) {
            return console.log('Unable to fetch')
        }

        console.log(user)
    })
})
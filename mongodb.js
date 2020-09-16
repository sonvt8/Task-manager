const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if (error) {
        console.log('Unable to connect to database!')
    }

    //CREATE DATABASE
    const db = client.db(databaseName)

    // db.collection('users').deleteMany(
    //     {
    //         age : {$lte : 28}
    //     }
    // ).then((result) => {
    //     console.log(result)
    // }).catch((err) => {
    //     console.log(err)
    // })

    db.collection('tasks').deleteOne({
        _id: new ObjectID("5f606c3d620efa2382dfd6e5")
    }).then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })
})
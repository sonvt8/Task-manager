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

    db.collection('users').find({age : 28}).toArray((error,users) => {
        console.log(users)
    })

    db.collection('users').find({age : 28}).count((error,count) => {
        console.log(count)
    })

    db.collection('tasks').findOne({_id : new ObjectID("5f606c3d620efa2382dfd6e5")},(error,task) => {
        if (error) {
            return console.log("Unable to find this task")
        }

        console.log(task)
    })

    db.collection('tasks').find({completed : false}).toArray((error, fasleTasks) => {
        console.log(fasleTasks)
    })
})
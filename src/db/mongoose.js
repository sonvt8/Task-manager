const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

// const User = mongoose.model('User', {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     }
// })

// const me = new User({
//     name: 'Tommy',
//     age: 32
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((err) => {
//     console.log('Error!',err)
// })

const Task = mongoose.model('Task',{
    description: {type: String},
    completed: {type: Boolean}
})

const myTask = new Task({
    description: 'Training two hours in Dev',
    completed: false
})

myTask.save().then(() => {
    console.log(myTask)
}).catch((err) => {
    console.log(err)
})
const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }
})

const me = new User({
    name: '  Vu    ',
    email: 'Tommy@gmail.com',
    age: 33
})

me.save().then(() => {
    console.log(me)
}).catch((err) => {
    console.log('Error!',err.errors)
})

const Task = mongoose.model('Task',{
    description: {type: String},
    completed: {type: Boolean}
})

// const myTask = new Task({
//     description: 'Training two hours in Dev',
//     completed: false
// })

// myTask.save().then(() => {
//     console.log(myTask)
// }).catch((err) => {
//     console.log(err)
// })